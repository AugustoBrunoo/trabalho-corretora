const express = require('express');
const router = express.Router();

const contaController = require('../controllers/contaController');

// Endpoint: POST /api/conta/deposito
router.post('/deposito', contaController.depositar);

// Endpoint: POST /api/conta/retirada
router.post('/retirada', contaController.retirada);

// Endpoint: GET /api/conta/transacoes
router.get('/transacoes', contaController.listarTransacoes);

module.exports = router;