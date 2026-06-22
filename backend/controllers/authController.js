const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuarioModel');
const AcaoInteresse = require('../models/acaoInteresseModel');
const precosService = require('../services/precosService');
const nodemailer = require('nodemailer'); // Certifique-se de ter o require do nodemailer no topo do arquivo


// Chave secreta usada pelo jwt.sign aqui e pelo auth.js na verificação (Assinatura)
const TOKEN_KEY = process.env.TOKEN_KEY;

// Funções de validação (Regex do Professor)
function verificaEmailValido(email) {
    if (!email) return false;
    return /^[A-Za-z0-9._%-]+@([A-Za-z0-9-].)+[A-Za-z]{2,4}$/.test(email);
}

function verificaSenhaValida(senha) {
    if (!senha) return false;
    if (senha.length < 8) return false;
    return /.*[a-zA-Z].*$/.test(senha) && /.*[0-9].*$/.test(senha);
}

// ==================== ENDPOINTS OFICIAIS ====================

const registrar = async (req, res) => {
    try {
        const { nome, email, senha, senhaRepetida } = req.body;

        if (!nome || nome.length === 0) {
            return res.status(400).json({ message: "O nome do usuário não pode ser vazio." });
        }
        if (!verificaEmailValido(email)) {
            return res.status(400).json({ message: "O e-mail do usuário não está em um formato adequado." });
        }

        // Busca no MongoDB se o e-mail já existe
        const usuarioExistente = await Usuario.findOne({ email: email });
        if (usuarioExistente) {
            return res.status(400).json({ message: "Já existe um usuário registrado com este e-mail." });
        }

        if (!verificaSenhaValida(senha)) {
            return res.status(400).json({ message: "A senha do usuário não é válida. Mínimo 8 caracteres, contendo letras e números." });
        }
        if (senha !== senhaRepetida) {
            return res.status(400).json({ message: "A confirmação de senha está diferente da senha." });
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10);

        // Cria o usuário no MongoDB e guarda a resposta para pegar o _id
        const novoUsuario = await Usuario.create({ nome, email, senha: senhaCriptografada });

        // =========================================================================
        // 10 Ações Aleatórias para Novos Usuários
        // =========================================================================
        try {
            // Pega as ações do minuto 0 para ter a lista completa
            const todosOsAtivos = await precosService.obterPrecosPorMinuto(0);

            // Embaralha a lista
            const ativosEmbaralhados = todosOsAtivos.sort(() => 0.5 - Math.random());

            // Pega apenas as 10 primeiras
            const dezAcoesAleatorias = ativosEmbaralhados.slice(0, 10);

            // Prepara os objetos para salvar no banco vinculados ao novo usuário
            const acoesParaSalvar = dezAcoesAleatorias.map(acao => ({
                usuario: novoUsuario._id,
                ticker: acao.ticker.toUpperCase()
            }));

            // Salva todas de uma vez 
            await AcaoInteresse.insertMany(acoesParaSalvar);
        } catch (erroAcoes) {
            console.error("Erro ao popular as 10 ações iniciais:", erroAcoes.message);
            // O try/catch interno garante que, se falhar a busca de ações, 
            // o cadastro do usuário não é cancelado.
        }
        // =========================================================================

        return res.status(201).json({ message: "O novo usuário foi criado com sucesso!" });
    } catch (erro) {
        return res.status(500).json({ message: "Erro no servidor ao registrar usuário.", detalhes: erro.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, senha } = req.body;

        // Busca o usuário no MongoDB
        const usuario = await Usuario.findOne({ email: email });
        if (!usuario) {
            return res.status(400).json({ message: "Credenciais inválidas." });
        }

        if (usuario.falhasLogin >= 3) {
            return res.status(400).json({ message: "Usuário bloqueado." });
        }

        const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
        if (!senhaCorreta) {
            usuario.falhasLogin++;
            await usuario.save(); // Salva a alteração no banco
            return res.status(400).json({ message: "Credenciais inválidas." });
        }

        if (usuario.falhasLogin !== 0) {
            usuario.falhasLogin = 0;
            await usuario.save(); // Salva a alteração no banco
        }

        const token = jwt.sign({ user_id: usuario._id, email }, TOKEN_KEY, { expiresIn: "2h" });

        return res.status(200).json({
            message: "Login bem sucedido.",
            usuario: { nome: usuario.nome, email: usuario.email, token: token }
        });
    } catch (erro) {
        return res.status(500).json({ message: "Erro no servidor ao fazer login.", detalhes: erro.message });
    }
};

//  RESETAR A SENHA USANDO O TOKEN RECEBIDO (DESLOGADO)
const resetarSenha = async (req, res) => {
    try {
        const { token, email, senha, senhaRepetida } = req.body;

        if (!verificaEmailValido(email)) {
            return res.status(400).json({ message: "O e-mail do usuário não está em um formato adequado." });
        }
        if (!token || token.length === 0) {
            return res.status(400).json({ message: "O token do usuário não é válido." });
        }

        const usuario = await Usuario.findOne({ email: email });
        if (!usuario) {
            return res.status(400).json({ message: "Não foi encontrado um usuário com este e-mail." });
        }

        if (usuario.tokenSenha !== token) {
            return res.status(400).json({ message: "Token de recuperação inválido ou já utilizado." });
        }

        const dateNow = new Date();
        const diferencaHoras = Math.abs(dateNow - usuario.dataTokenSenha) / (60.0 * 60.0 * 1000.0);
        if (diferencaHoras > 72) {
            return res.status(400).json({ message: "O token de troca de senha do usuário está vencido." });
        }

        if (!verificaSenhaValida(senha)) {
            return res.status(400).json({ message: "A senha do usuário não é válida. Mínimo 8 caracteres, contendo letras e números." });
        }
        if (senha !== senhaRepetida) {
            return res.status(400).json({ message: "A confirmação de senha está diferente da senha." });
        }

        usuario.senha = await bcrypt.hash(senha, 10);
        usuario.tokenSenha = null;
        usuario.dataTokenSenha = null;
        await usuario.save(); // Salva a alteração no banco

        return res.status(200).json({ message: "Nova senha registrada com sucesso!" });
    } catch (erro) {
        return res.status(500).json({ message: "Erro no servidor ao resetar senha.", detalhes: erro.message });
    }
};

// TROCAR SENHA DE USUÁRIO JÁ LOGADO (EXIGE A PULSEIRA JWT)
const trocaSenhaLogado = async (req, res) => {
    try {
        const auth = require('../auth/auth');
        const claims = auth.verifyToken(req, res);

        if (!claims) {
            return res.status(401).json({ message: "Acesso não autorizado. Faça login primeiro." });
        }

        const userId = claims.user_id;

        //  Busca pelo ID do MongoDB (_id)
        const usuario = await Usuario.findById(userId);
        if (!usuario) {
            return res.status(400).json({ message: "Usuário não encontrado." });
        }

        const { senhaAntiga, senhaNova, senhaNovaRepetida } = req.body;

        const senhaCorreta = await bcrypt.compare(senhaAntiga, usuario.senha);
        if (!senhaCorreta) {
            return res.status(400).json({ message: "A senha antiga não confere com as credenciais do usuário." });
        }

        if (!verificaSenhaValida(senhaNova)) {
            return res.status(400).json({ message: "A nova senha do usuário não é válida." });
        }
        if (senhaNova !== senhaNovaRepetida) {
            return res.status(400).json({ message: "A confirmação de nova senha está diferente da senha." });
        }

        usuario.senha = await bcrypt.hash(senhaNova, 10);
        await usuario.save(); // Salva a alteração no banco
        
        return res.status(200).json({ message: "Nova senha registrada com sucesso!" });
    } catch (erro) {
        return res.status(500).json({ message: "Erro no servidor ao trocar senha logado.", detalhes: erro.message });
    }
};

// SOLICITAR RECUPERAÇÃO DE SENHA (MODO SANDBOX - ACEITA QUALQUER E-MAIL)
const esqueciSenha = async (req, res) => {
    try {
        const { email } = req.body;

        if (!verificaEmailValido(email)) {
            return res.status(400).json({ message: "O e-mail do usuário não está em um formato adequado." });
        }

        const usuario = await Usuario.findOne({ email: email });
        if (!usuario) {
            return res.status(400).json({ message: "Não foi encontrado um usuário com este e-mail." });
        }

        // Mantém a geração do seu token padrão do sistema
        const tokenRecuperacao = Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2);

        usuario.tokenSenha = tokenRecuperacao;
        usuario.dataTokenSenha = new Date();
        await usuario.save(); 

        const urlSimulada = `http://localhost:5173/login/reset?token=${tokenRecuperacao}&email=${usuario.email}`;

        // =========================================================================
        // CONFIGURAÇÃO DO TRANSPORTER VIA SMTP SANDBOX (PEGA QUALQUER DESTINATÁRIO)
        // =========================================================================
        const transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                // Vá na aba "SMTP Settings" da sua Inbox no Mailtrap e pegue esses dois valores:
                user: "89321183079fb4", 
                pass: "9b827640a1b595"  
            }
        });

        const mailOptions = {
            from: '"Suporte PrimeInvest" <suporte@primeinvest.com>', // Aqui você pode colocar o e-mail que quiser!
            to: usuario.email, // Agora aceita qualquer e-mail digitado no banco!
            subject: "🔒 Recuperação de Senha - PrimeInvest",
            html: `
                <div style="font-family: Arial, sans-serif; max-w: 600px; margin: 0 auto; background-color: #0F172A; padding: 40px; border-radius: 12px; color: #F8FAFC;">
                    <div style="text-align: center; margin-bottom: 30px;">
                        <h1 style="color: #EAB308; margin: 0; font-size: 28px;">Prime<span style="color: #FFFFFF;">Invest</span></h1>
                    </div>
                    <h2 style="color: #FFFFFF; font-size: 20px; margin-bottom: 15px;">Olá, ${usuario.nome.split(' ')[0]}!</h2>
                    <p style="color: #94A3B8; font-size: 15px; line-height: 1.6;">Recebemos uma solicitação para redefinir a senha da sua conta PrimeInvest.</p>
                    <p style="color: #94A3B8; font-size: 15px; line-height: 1.6;">Clique no botão dourado abaixo para escolher uma nova senha de acesso. Este link é seguro e expira em breve.</p>
                    
                    <div style="text-align: center; margin: 35px 0;">
                        <a href="${urlSimulada}" style="display: inline-block; background-color: #EAB308; color: #0B0F19; text-decoration: none; font-weight: bold; font-size: 15px; padding: 14px 28px; border-radius: 8px;">
                            Criar Nova Senha
                        </a>
                    </div>
                    
                    <p style="color: #64748B; font-size: 12px; text-align: center; border-top: 1px solid #1E293B; padding-top: 20px; margin-top: 30px;">
                        Se você não solicitou a alteração de senha, ignore este e-mail por segurança.
                    </p>
                </div>
            `
        };

        // Envia o e-mail usando o nodemailer padrão
        await transporter.sendMail(mailOptions);
        // =========================================================================

        return res.status(200).json({
            message: "As instruções de recuperação foram enviadas para a sua caixa de entrada com sucesso!"
        });

    } catch (erro) {
        console.error("Erro no servidor ao processar esqueciSenha:", erro.message);
        return res.status(500).json({ message: "Erro no servidor ao solicitar nova senha.", detalhes: erro.message });
    }
};

module.exports = {
    registrar,
    login,
    esqueciSenha,
    resetarSenha,
    trocaSenhaLogado,
    TOKEN_KEY
};