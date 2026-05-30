const express = require('express');
const router = express.Router();
const ordemController = require('../controllers/ordemController');
const { verifyToken } = require('../auth/auth'); 

// Aplica o verifyToken como intermediário em todas as rotas
router.post('/', verifyToken, ordemController.processarOrdem);

router.get('/pendentes', verifyToken, ordemController.listarOrdensPendentes);
router.delete('/:id', verifyToken, ordemController.cancelarOrdemCondicional);
router.get('/transacoes', verifyToken, ordemController.exibirHistoricoOrdens);

module.exports = router;