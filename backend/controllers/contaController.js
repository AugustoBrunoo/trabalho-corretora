const transacaoModel = require('../models/transacaoModel');

const depositar = (req, res) => {
    const { valor, descricao } = req.body; 

    if (!valor || valor <= 0) {
        return res.status(400).json({ erro: "O valor do depósito deve ser maior que zero." });
    }

    const novaTransacao = transacaoModel.registrarTransacao("deposito", valor, descricao);

    return res.status(200).json({
        mensagem: "Depósito realizado com sucesso!",
        transacao: novaTransacao
    });
};

// Funções falsas apenas para a rota não dar erro por enquanto
const retirar = (req, res) => { res.status(200).json({ msg: "Em breve" }); };
const listarTransacoes = (req, res) => { res.status(200).json({ msg: "Em breve" }); };

module.exports = {
    depositar,
    retirar,
    listarTransacoes
};