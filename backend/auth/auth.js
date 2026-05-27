// auth/auth.js
const jwt = require("jsonwebtoken");

const TOKEN_KEY = process.env.TOKEN_KEY;

// Recupera as "claims" de um token JWT (Padrão do Professor + Suporte a Middleware)
const verifyToken = function (req, res, next) {
    if (!req.headers) {
        if (typeof next === 'function') return res.status(401).json({ erro: "Acesso não autorizado." });
        return null;
    }

    if (!req.headers.authorization) {
        if (typeof next === 'function') return res.status(401).json({ erro: "Acesso não autorizado." });
        return null;
    }

    var authorization = req.headers.authorization.split(' ');

    if (authorization.length != 2) {
        if (typeof next === 'function') return res.status(401).json({ erro: "Formato do token inválido." });
        return null;
    }

    try {
        // Valida a pulseira
        const decoded = jwt.verify(authorization[1], TOKEN_KEY);
        
        // Injeta o usuário na requisição para caso o controller use req.usuario
        req.usuario = decoded; 
        
        //  SE FOR MIDDLEWARE: Passa para o próximo método (Controller) e destrava a requisição
        if (typeof next === 'function') {
            return next();
        }
        
        // SE FOR FUNÇÃO AUXILIAR: Retorna as claims normalmente como o professor programou
        return decoded;
    }
    catch (e) {
        if (typeof next === 'function') return res.status(401).json({ erro: "Token inválido ou expirado." });
        return null;
    }
}

module.exports = { verifyToken };