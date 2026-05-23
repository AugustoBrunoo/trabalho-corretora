const mercadoModel = require('../models/mercadoModel');
const precosService = require('../services/precosService');

//  Retorna o minuto atual do sistema
const pegarTempo = (req, res) => {
    return res.status(200).json({ minutoAtual: mercadoModel.obterTempo() });
};

// Avança o relógio
const avancarTempo = (req, res) => {
    const { minutos } = req.body;

    if (!minutos || minutos <= 0) {
        return res.status(400).json({ erro: "Informe uma quantidade válida de minutos para avançar." });
    }

    const novoTempo = mercadoModel.avancarTempo(minutos);

    // [NOTA FUTURA]: Aqui você chamará a função do OrdemController 
    // para verificar se alguma ordem condicional bateu com os novos preços!

    return res.status(200).json({
        mensagem: `Tempo avançado com sucesso em ${minutos} minutos.`,
        minutoAtual: novoTempo
    });
};

//  Adiciona uma ação na tela inicial
const adicionarAcaoInteresse = (req, res) => {
    const { ticker } = req.body;

    if (!ticker) {
        return res.status(400).json({ erro: "O código da ação (ticker) é obrigatório." });
    }

    // Passa para maiúsculo para padronizar (ex: petr4 vira PETR4)
    mercadoModel.adicionarAcao(ticker.toUpperCase());

    return res.status(200).json({ 
        mensagem: `${ticker.toUpperCase()} foi adicionada à sua lista de interesse.` 
    });
};

//  Remove uma ação da tela inicial
const removerAcaoInteresse = (req, res) => {
    // Pega o ticker direto da URL (ex: /api/mercado/acoes/PETR4)
    const { ticker } = req.params; 

    mercadoModel.removerAcao(ticker.toUpperCase());

    return res.status(200).json({ 
        mensagem: `${ticker.toUpperCase()} foi removida da sua lista de interesse.` 
    });
};

// Lista as ações com os preços atualizados do minuto exato
const listarAcoesInteresse = async (req, res) => {
    try {
        const minutoAtual = mercadoModel.obterTempo();
        const acoesSalvas = mercadoModel.obterAcoesInteresse();

        // Vai na internet/GitHub buscar TODOS os preços deste minuto
        const todosOsPrecos = await precosService.obterPrecosPorMinuto(minutoAtual);

        // Filtra a lista gigante do professor para mostrar apenas as que o usuário escolheu
        const acoesFiltradas = todosOsPrecos.filter(acao => acoesSalvas.includes(acao.ticker));

        return res.status(200).json({
            minutoAtual: minutoAtual,
            acoes: acoesFiltradas
        });

    } catch (erro) {
        return res.status(500).json({ 
            erro: "Erro ao buscar as cotações no serviço do professor.",
            detalhe: erro.message 
        });
    }
};

module.exports = {
    pegarTempo,
    avancarTempo,
    adicionarAcaoInteresse,
    removerAcaoInteresse,
    listarAcoesInteresse
};