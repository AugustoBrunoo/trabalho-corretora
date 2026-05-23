const ordemModel = require('../models/ordemModel');
const carteiraModel = require('../models/carteiraModel');
const mercadoModel = require('../models/mercadoModel');
const precosService = require('../services/precosService');
const transacaoModel = require('../models/transacaoModel');

// Função auxiliar para calcular o saldo real do usuário baseado no histórico
const obterSaldoAtual = () => {
    const transacoes = transacaoModel.obterTransacoes();
    let saldo = 0;
    transacoes.forEach(t => {
        if (t.tipo === "deposito") saldo += t.valor;
        if (t.tipo === "retirada") saldo -= t.valor;
    });
    return saldo;
};

const processarOrdem = async (req, res) => {
    const { usuario, ticker, quantidade, tipoOrdem, tipoExecucao, precoReferencia } = req.body;
    const minutoAtual = mercadoModel.obterTempo();

    // Verifica se tem campo obrigatório vazio
    if (!ticker || !quantidade || !tipoOrdem || !tipoExecucao) {
        return res.status(400).json({ erro: "Campos obrigatórios ausentes." });
    }

    if (tipoExecucao === 'mercado') {
        try {
            //  Busca o preço real do ativo no minuto atual do sistema
            const precos = await precosService.obterPrecosPorMinuto(minutoAtual);
            const cotacao = precos.find(p => p.ticker === ticker.toUpperCase());
            
            if (!cotacao) {
                return res.status(404).json({ erro: `Ação ${ticker} não encontrada no mercado para o minuto ${minutoAtual}.` });
            }
            
            const precoAtual = cotacao.currentPrice || cotacao.preco;
            const valorTotalOrdem = precoAtual * quantidade;

            // Lógica de compra
            if (tipoOrdem === 'compra') {
                const saldoDisponivel = obterSaldoAtual();
                if (saldoDisponivel < valorTotalOrdem) {
                    return res.status(400).json({ 
                        erro: "Saldo insuficiente para realizar a compra.", 
                        saldoAtual: saldoDisponivel, 
                        custoNecessario: valorTotalOrdem 
                    });
                }

                // Debita o valor da conta corrente do usuário
                transacaoModel.registrarTransacao("retirada", valorTotalOrdem, `Compra de ${quantidade} ações de ${ticker.toUpperCase()}`);
                // Adiciona o ativo na carteira 
                carteiraModel.adicionarAtivo(ticker.toUpperCase(), quantidade, precoAtual);
                
                const ordemSalva = ordemModel.criarOrdem({
                    usuario, minutoRegistro: minutoAtual, minutoExecucao: minutoAtual,
                    tipoOrdem: 'compra', ticker, quantidade, tipoExecucao,
                    precoReferencia: precoAtual, status: 'executada'
                });

                return res.status(200).json({ mensagem: "Ordem de compra a mercado executada!", ordem: ordemSalva });
            } 
            
            // Lógica de venda
            else if (tipoOrdem === 'venda') {
                const carteira = carteiraModel.obterCarteira();
                const ativoNaCarteira = carteira.find(a => a.ticker === ticker.toUpperCase());

                if (!ativoNaCarteira || ativoNaCarteira.quantidade < quantidade) {
                    return res.status(400).json({ erro: "Você não possui quantidade suficiente desta ação para vender." });
                }

                // Registra o dinheiro da venda entrando na conta corrente 
                transacaoModel.registrarTransacao("deposito", valorTotalOrdem, `Venda de ${quantidade} ações de ${ticker.toUpperCase()}`);
                // diminui as ações da carteira
                carteiraModel.adicionarAtivo(ticker.toUpperCase(), -quantidade, precoAtual); 

                const ordemSalva = ordemModel.criarOrdem({
                    usuario, minutoRegistro: minutoAtual, minutoExecucao: minutoAtual,
                    tipoOrdem: 'venda', ticker, quantidade, tipoExecucao,
                    precoReferencia: precoAtual, status: 'executada'
                });

                return res.status(200).json({ mensagem: "Ordem de venda a mercado executada!", ordem: ordemSalva });
            }

        } catch (erro) {
            return res.status(500).json({ erro: "Erro ao processar cotações do mercado.", detalhes: erro.message });
        }
    } 
    
    //  Lógica de uma condicional
    else if (tipoExecucao === 'condicional') {
        if (!precoReferencia) {
            return res.status(400).json({ erro: "Para ordens condicionais, informe o preço de referência (preço alvo)." });
        }

        const ordemSalva = ordemModel.criarOrdem({
            usuario, minutoRegistro: minutoAtual,
            tipoOrdem, ticker, quantidade, tipoExecucao,
            precoReferencia, status: 'pendente'
        });

        return res.status(200).json({ mensagem: "Ordem condicional registrada e aguardando gatilho de preço.", ordem: ordemSalva });
    }
};

const listarOrdensNaoExecutadas = (req, res) => {
    const todas = ordemModel.obterTodasOrdens();
    const pendentes = todas.filter(o => o.status === 'pendente');
    return res.status(200).json(pendentes);
};

const cancelarOrdemCondicional = (req, res) => {
    const { id } = req.params;
    const ordemCancelada = ordemModel.atualizarStatusOrdem(id, 'cancelada');
    
    if (!ordemCancelada) {
        return res.status(404).json({ erro: "Ordem não encontrada." });
    }
    
    return res.status(200).json({ mensagem: "Ordem condicional cancelada com sucesso.", ordem: ordemCancelada });
};

const obterHistoricoTransacoes = (req, res) => {
    const todas = ordemModel.obterTodasOrdens();
    return res.status(200).json(todas);
};

module.exports = {
    processarOrdem,
    listarOrdensNaoExecutadas,
    cancelarOrdemCondicional,
    obterHistoricoTransacoes
};