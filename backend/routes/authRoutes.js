const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { verifyToken } = require('../auth/auth');


// Rota de Cadastro
// Método: POST
// O que faz: Recebe nome, email, senha e senhaRepetida do Front-end e manda para o Controller criar a conta.
router.post('/registro', authController.registrar);

// Rota de Login
// Método: POST
// O que faz: Recebe email e senha. Se estiver tudo certo, o Controller devolve a "pulseira digital" (Token JWT).
router.post('/login', authController.login);

// Rota 3: Solicitar recuperação (POST /api/auth/esqueci)
// Usuário deslogado digita o e-mail dele pedindo ajuda.
router.post('/esqueci', authController.esqueciSenha);

// Rota 4: Resetar a senha com o token (POST /api/auth/reset)
// Usuário envia o token recebido e a nova senha desejada.
router.post('/reset', authController.resetarSenha);

// Rota 5: Trocar senha logado (POST /api/auth/trocaSenha)
// Usuário logado fornece a senha antiga e altera para uma nova. Exige JWT enviado no Header!
router.patch('/trocaSenha', verifyToken, authController.trocaSenhaLogado);

// 3. Exportamos o roteador para que o arquivo principal (server.js) consiga enxergar essas rotas
module.exports = router;