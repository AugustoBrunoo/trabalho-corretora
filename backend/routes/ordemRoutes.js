const express = require('express');
const router = express.Router();
const ordemController = require('../controllers/ordemController');

router.post('/', ordemController.processarOrdem);

router.get('/pendentes', ordemController.listarOrdensNaoExecutadas);
router.delete('/:id', ordemController.cancelarOrdemCondicional);
router.get('/transacoes', ordemController.obterHistoricoTransacoes);

module.exports = router;