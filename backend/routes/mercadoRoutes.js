const express = require('express');
const router = express.Router();

const mercadoController = require('../controllers/mercadoController');

// Rotas de Tempo
// GET /api/mercado/tempo - Retorna o minuto atual
router.get('/tempo', mercadoController.pegarTempo);

// POST /api/mercado/tempo - Avança o relógio
router.post('/tempo', mercadoController.avancarTempo);

// Rotas de Ações de Interesse
// GET /api/mercado/acoes - Lista as ações escolhidas com preços do minuto atual
router.get('/acoes', mercadoController.listarAcoesInteresse);

// POST /api/mercado/acoes - Adiciona uma ação para acompanhar
router.post('/acoes', mercadoController.adicionarAcaoInteresse);

// DELETE /api/mercado/acoes/:ticker - Remove uma ação 
router.delete('/acoes/:ticker', mercadoController.removerAcaoInteresse);

module.exports = router;