/**
 * A CAMADA DE ROTAS / O GARÇOM)
 * * 1. CAPTURA: Fica escutando os pedidos que o Front-end faz (ex: fetch).
 * 2. FILTRA: Verifica qual é o endereço (URL) e o método HTTP (GET, POST, etc.).
 * 3. DIRECIONA: Se o endereço bater, ele apenas "linka" e passa o pedido 
 * para o Controller (o Chefe) resolver a lógica de verdade.
 * * REGRA: Rota NÃO calcula nada e NÃO mexe em dados. Só redireciona
 */

const express = require('express');
const router = express.Router();

const contaController = require('../controllers/contaController');

// Endpoint: POST /api/conta/deposito
router.post('/deposito', contaController.depositar);

// Endpoint: POST /api/conta/retirada
router.post('/retirada', contaController.retirar);

// Endpoint: GET /api/conta/transacoes
router.get('/transacoes', contaController.listarTransacoes);

module.exports = router;