const express = require('express');
const router = express.Router();
const contaController = require('../controllers/contaController');
const { verifyToken } = require('../auth/auth');

router.post('/deposito', verifyToken, contaController.depositar);
router.post('/retirada', verifyToken, contaController.retirada);
router.get('/transacoes', verifyToken, contaController.listarTransacoes);

module.exports = router;