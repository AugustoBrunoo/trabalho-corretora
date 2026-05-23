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

const retirar = (req, res) => {
    const { valor, descricao } = req.body;

    if (!valor || valor <= 0) {
        return res.status(400).json({ erro: "O valor da retirada deve ser maior que zero." });
    }

    // Pega todas as transações para calcularmos o saldo atual
    const transacoes = transacaoModel.obterTransacoes();
    
    let saldo = 0;
    transacoes.forEach(t => {
        if (t.tipo === "deposito") saldo += t.valor;
        if (t.tipo === "retirada") saldo -= t.valor;
    });

    // Verifica se o usuário tem dinheiro suficiente
    if (valor > saldo) {
        return res.status(400).json({ 
            erro: "Saldo insuficiente para esta retirada.", 
            saldoAtual: saldo 
        });
    }

    // Se passou pela verificação, registra a retirada
    const novaTransacao = transacaoModel.registrarTransacao("retirada", valor, descricao);

    return res.status(200).json({
        mensagem: "Retirada realizada com sucesso!",
        transacao: novaTransacao,
        saldoRestante: saldo - valor
    });
};

const listarTransacoes = (req, res) => {
    // Busca todas as transações salvas no Model
    const transacoes = transacaoModel.obterTransacoes();

    // calculamos o saldo atual para mandar para o Frontend
    let saldo = 0;
    transacoes.forEach(t => {
        if (t.tipo === "deposito") saldo += t.valor;
        if (t.tipo === "retirada") saldo -= t.valor;
    });

    // Devolvemos o extrato completo e o saldo final 
    return res.status(200).json({
        saldoAtual: saldo,
        historico: transacoes
    });
};

module.exports = {
    depositar,
    retirar,
    listarTransacoes
};