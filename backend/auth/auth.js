// auth/auth.js
const jwt = require("jsonwebtoken");

const TOKEN_KEY = process.env.TOKEN_KEY;

// Recupera as "claims" de um token JWT (Padrão do Professor)
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
        // Valida a pulseira
        return jwt.verify(authorization[1], TOKEN_KEY);
    }
    catch (e) {
        return null;
    }
}

module.exports = { verifyToken }