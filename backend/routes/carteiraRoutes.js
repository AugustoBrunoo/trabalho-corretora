const express = require('express');
const router = express.Router();
const carteiraController = require('../controllers/carteiraController');
const { verifyToken } = require('../auth/auth');

router.get('/', verifyToken, carteiraController.consultarCarteira);

module.exports = router;