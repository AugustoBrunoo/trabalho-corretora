const usarioMOdel = require('../models/usuarioModel');

const criarConta = (req, res) => {
       const {nome, email, senha } = req.body;

       if(!verificarNome(req.body.nome)){
        res.status(400).send('Problema com o Nome');
        }
}

function verificarNome(nome){
    console.log("Nome");
    return true;
};