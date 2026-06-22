const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuarioModel');
const AcaoInteresse = require('../models/acaoInteresseModel');
const precosService = require('../services/precosService');
const emailService = require('../services/emailService'); // 🌟 Novo serviço integrado da Resend

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
        const novoUsuario = await Usuario.create({ nome, email, senha: senhaCriptografada });

        try {
            const todosOsAtivos = await precosService.obterPrecosPorMinuto(0);
            const ativosEmbaralhados = todosOsAtivos.sort(() => 0.5 - Math.random());
            const dezAcoesAleatorias = ativosEmbaralhados.slice(0, 10);

            const acoesParaSalvar = dezAcoesAleatorias.map(acao => ({
                usuario: novoUsuario._id,
                ticker: acao.ticker.toUpperCase()
            }));

            await AcaoInteresse.insertMany(acoesParaSalvar);
        } catch (erroAcoes) {
            console.error("Erro ao popular as 10 ações iniciais:", erroAcoes.message);
        }

        return res.status(201).json({ message: "O novo usuário foi criado com sucesso!" });
    } catch (erro) {
        return res.status(500).json({ message: "Erro no servidor ao registrar usuário.", detalhes: erro.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, senha } = req.body;

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
            await usuario.save();
            return res.status(400).json({ message: "Credenciais inválidas." });
        }

        if (usuario.falhasLogin !== 0) {
            usuario.falhasLogin = 0;
            await usuario.save();
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

// 🔒 ROTA 3: SOLICITAR RECUPERAÇÃO (Chama a Resend API de forma assíncrona)
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

        // Gera o token randómico seguro que vai anexado à URL
        const tokenRecuperacao = Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2);

        usuario.tokenSenha = tokenRecuperacao;
        usuario.dataTokenSenha = new Date();
        await usuario.save(); 

        // Rota do teu ecossistema Vue (mapeada no teu front-end para abrir o NovaSenhaForm.vue)
        const urlSimulada = `http://localhost:5173/login/reset?token=${tokenRecuperacao}&email=${usuario.email}`;

        // 🌟 Dispara o e-mail real usando o serviço que consome a API da Resend
        await emailService.enviarEmailRecuperacao(usuario.email, usuario.nome, urlSimulada);

        return res.status(200).json({
            message: "As instruções de recuperação foram enviadas para a sua caixa de entrada com sucesso!"
        });

    } catch (erro) {
        console.error("Erro no servidor ao processar esqueciSenha com Resend:", erro.message);
        return res.status(500).json({ message: "Erro no servidor ao solicitar nova senha.", detalhes: erro.message });
    }
};

// 🔒 ROTA 4: RESETAR A SENHA (Quando o utilizador volta da URL clicada no e-mail)
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

        // Validação do tempo de expiração do token (Máximo 72 horas segundo a regra atual do código)
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

        // Guarda a nova password encriptada e limpa o token para impedir reuso por segurança
        usuario.senha = await bcrypt.hash(senha, 10);
        usuario.tokenSenha = null;
        usuario.dataTokenSenha = null;
        await usuario.save();

        return res.status(200).json({ message: "Nova senha registrada com sucesso!" });
    } catch (erro) {
        return res.status(500).json({ message: "Erro no servidor ao resetar senha.", detalhes: erro.message });
    }
};

const trocaSenhaLogado = async (req, res) => {
    try {
        const auth = require('../auth/auth');
        const claims = auth.verifyToken(req, res);

        if (!claims) {
            return res.status(401).json({ message: "Acesso não autorizado. Faça login primeiro." });
        }

        const userId = claims.user_id;
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
        await usuario.save();
        
        return res.status(200).json({ message: "Nova senha registrada com sucesso!" });
    } catch (erro) {
        return res.status(500).json({ message: "Erro no servidor ao trocar senha logado.", detalhes: erro.message });
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