const express = require('express');

const router = express.Router();

const ordemController = require('../controllers/ordemController');

router.post('/ordens', ordemController.pegarOrdem);

module.exports = router;