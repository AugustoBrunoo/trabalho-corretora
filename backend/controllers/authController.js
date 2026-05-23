const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const usuarioModel = require('../models/usuarioModel');

// Chave secreta usada pelo jwt.sign aqui e pelo auth.js na verificação (Assinatura)
const TOKEN_KEY = "MINHA_CHAVE_SECRETA_SUPER_PROTEGIDA";

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
    const { nome, email, senha, senhaRepetida } = req.body;

    if (!nome || nome.length === 0) {
        return res.status(400).json({ message: "O nome do usuário não pode ser vazio." });
    }
    if (!verificaEmailValido(email)) {
        return res.status(400).json({ message: "O e-mail do usuário não está em um formato adequado." });
    }
    const usuarioExistente = usuarioModel.buscarPorEmail(email);
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
    usuarioModel.criarUsuario({ nome, email, senha: senhaCriptografada });

    return res.status(201).json({ message: "O novo usuário foi criado." });
};

const login = async (req, res) => {
    const { email, senha } = req.body;

    const usuario = usuarioModel.buscarPorEmail(email);
    if (!usuario) {
        return res.status(400).json({ message: "Credenciais inválidas." });
    }

    if (usuario.falhasLogin >= 3) {
        return res.status(400).json({ message: "Usuário bloqueado." });
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    if (!senhaCorreta) {
        usuario.falhasLogin++;
        usuarioModel.atualizarUsuario(usuario);
        return res.status(400).json({ message: "Credenciais inválidas." });
    }

    if (usuario.falhasLogin !== 0) {
        usuario.falhasLogin = 0;
        usuarioModel.atualizarUsuario(usuario);
    }

    // Assina o token JWT exatamente como o professor fez
    const token = jwt.sign({ user_id: usuario.id, email }, TOKEN_KEY, { expiresIn: "2h" });

    return res.status(200).json({
        message: "Login bem sucedido.",
        usuario: { nome: usuario.nome, email: usuario.email, token: token }
    });
};

// 3. SOLICITAR RECUPERAÇÃO DE SENHA (ESQUECI A SENHA - DESLOGADO)
const esqueciSenha = async (req, res) => {
    const { email } = req.body;

    if (!verificaEmailValido(email)) {
        return res.status(400).json({ message: "O e-mail do usuário não está em um formato adequado." });
    }

    const usuario = usuarioModel.buscarPorEmail(email);
    if (!usuario) {
        return res.status(400).json({ message: "Não foi encontrado um usuário com este e-mail." });
    }

    // Gera um token aleatório simples de 32 caracteres (Simulando o crypto do professor)
    const tokenRecuperacao = Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2);

    usuario.dataAtualizacao = new Date();
    usuario.tokenSenha = tokenRecuperacao;
    usuario.dataTokenSenha = new Date(); // Guarda a hora atual para validar o vencimento depois

    usuarioModel.atualizarUsuario(usuario);

    // SIMULAÇÃO INTELIGENTE: Em vez de enviar por e-mail, devolvemos o link no JSON para você testar!
    const urlSimulada = `http://localhost:3000/login/reset?token=${tokenRecuperacao}&email=${usuario.email}`;

    return res.status(200).json({
        message: "Simulação: Token de recuperação gerado com sucesso!",
        DICA_PARA_TESTE: "Copie o tokenSenha abaixo para usar no próximo teste (/reset)",
        tokenSenha: tokenRecuperacao,
        urlAcessoFrontend: urlSimulada
    });
};

// 4. RESETAR A SENHA USANDO O TOKEN RECEBIDO (DESLOGADO)
const resetarSenha = async (req, res) => {
    const { token, email, senha, senhaRepetida } = req.body;

    if (!verificaEmailValido(email)) {
        return res.status(400).json({ message: "O e-mail do usuário não está em um formato adequado." });
    }
    if (!token || token.length === 0) {
        return res.status(400).json({ message: "O token do usuário não é válido." });
    }

    const usuario = usuarioModel.buscarPorEmail(email);
    if (!usuario) {
        return res.status(400).json({ message: "Não foi encontrado um usuário com este e-mail." });
    }

    // Verifica se o token que o usuário enviou bate com o que está salvo no "banco"
    if (usuario.tokenSenha !== token) {
        return res.status(400).json({ message: "Token de recuperação inválido ou já utilizado." });
    }

    // Regra do professor: Verifica se o token tem menos de 72 horas de vida
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

    // Criptografa a nova senha e limpa os tokens para não serem reutilizados
    usuario.senha = await bcrypt.hash(senha, 10);
    usuario.tokenSenha = null;
    usuario.dataTokenSenha = null;
    usuarioModel.atualizarUsuario(usuario);

    return res.status(200).json({ message: "Nova senha registrada com sucesso!" });
};

// 5. TROCAR SENHA DE USUÁRIO JÁ LOGADO (EXIGE A PULSEIRA JWT)
const trocaSenhaLogado = async (req, res) => {
    // Importamos o auth aqui dentro para ler a pulseira JWT externa do professor
    const auth = require('../auth/auth');
    const claims = auth.verifyToken(req, res);

    if (!claims) {
        return res.status(401).json({ message: "Acesso não autorizado. Faça login primeiro." });
    }

    const userId = claims.user_id; // Pega o ID de dentro do Token JWT protegido!
    const { senhaAntiga, senhaNova, senhaNovaRepetida } = req.body;

    const usuario = usuarioModel.buscarPorId(userId);
    if (!usuario) {
        return res.status(400).json({ message: "Usuário não encontrado." });
    }

    // Confere se a senha antiga digitada bate com a que está no banco
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

    // Criptografa e atualiza
    usuario.senha = await bcrypt.hash(senhaNova, 10);
    usuarioModel.atualizarUsuario(usuario);

    return res.status(200).json({ message: "Nova senha registrada com sucesso!" });
};

// ATENÇÃO: Lembre de atualizar o seu module.exports para incluir as novas funções e a TOKEN_KEY!
module.exports = {
    registrar,
    login,
    esqueciSenha,
    resetarSenha,
    trocaSenhaLogado,
    TOKEN_KEY
};