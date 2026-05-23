// auth/auth.js
const jwt = require("jsonwebtoken");

// Importamos a chave secreta que vamos centralizar no Controller por enquanto
const authController = require('../controllers/authController');

//
// Recupera as "claims" de um token JWT (Padrão do Professor)
//
const verifyToken = function (req, res) {
    if (!req.headers) {
        return null;
    }

    if (!req.headers.authorization) {
        return null;
    }

    var authorization = req.headers.authorization.split(' ');

    if (authorization.length != 2) {
        return null;
    }

    try {
        // Valida a pulseira usando a chave do controller
        return jwt.verify(authorization[1], authController.TOKEN_KEY);
    }
    catch (e) {
        return null;
    }
}

module.exports = { verifyToken }