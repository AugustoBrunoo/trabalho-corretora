const precosService = require('../services/precosService');
const AcaoInteresse = require('../models/acaoInteresseModel');
const Ordem = require('../models/ordemModel');
const Carteira = require('../models/carteiraModel');
const Usuario = require('../models/usuarioModel');
const Transacao = require('../models/transacaoModel');
const Mercado = require('../models/mercadoModel'); 
const auth = require('../auth/auth');

// Função auxiliar (automatização de ordens pendentes)
async function processarOrdensCondicionaisAgendadas(minutoAtual) {
    try {
        const ordensPendentes = await Ordem.find({ status: 'pendente' });
        if (ordensPendentes.length === 0) return;

        const precosAgora = await precosService.obterPrecosPorMinuto(minutoAtual);

        for (let ordem of ordensPendentes) {
            const cotacao = precosAgora.find(p => p.ticker === ordem.ticker.toUpperCase());
            if (!cotacao) continue;

            const precoAtual = cotacao.preco;
            let dispararGatilho = false;

            if (ordem.tipoOrdem === 'compra' && precoAtual <= ordem.precoReferencia) {
                dispararGatilho = true;
            } else if (ordem.tipoOrdem === 'venda' && precoAtual >= ordem.precoReferencia) {
                dispararGatilho = true;
            }

            if (dispararGatilho) {
                const usuario = await Usuario.findById(ordem.usuario);
                if (!usuario) {
                    ordem.status = 'falhada';
                    await ordem.save();
                    continue;
                }

                const valorTotalOrdem = precoAtual * ordem.quantidade;

                if (ordem.tipoOrdem === 'compra') {
                    if (usuario.saldoGeral >= valorTotalOrdem) {
                        usuario.saldoGeral -= valorTotalOrdem;
                        await usuario.save();

                        await Transacao.create({
                            usuario: usuario._id,
                            tipo: "retirada",
                            valor: valorTotalOrdem,
                            descricao: `[EXECUÇÃO AUTOMÁTICA] Compra condicional de ${ordem.quantidade} ações de ${ordem.ticker}`,
                            minutoSimulacao: minutoAtual,
                            saldoResultante: usuario.saldoGeral
                        });

                        let ativoNaCarteira = await Carteira.findOne({ usuario: usuario._id, ticker: ordem.ticker });
                        if (ativoNaCarteira) {
                            const novaQtd = ativoNaCarteira.quantidade + ordem.quantidade;
                            ativoNaCarteira.precoMedio = ((ativoNaCarteira.precoMedio * ativoNaCarteira.quantidade) + (precoAtual * ordem.quantidade)) / novaQtd;
                            ativoNaCarteira.quantidade = novaQtd;
                            await ativoNaCarteira.save();
                        } else {
                            await Carteira.create({ usuario: usuario._id, ticker: ordem.ticker, quantidade: ordem.quantidade, precoMedio: precoAtual });
                        }

                        ordem.status = 'executada';
                        ordem.minutoExecucao = minutoAtual;
                        ordem.precoReferencia = precoAtual;
                        await ordem.save();
                    } else {
                        ordem.status = 'falhada';
                        await ordem.save();
                    }
                } 
                else if (ordem.tipoOrdem === 'venda') {
                    let ativoNaCarteira = await Carteira.findOne({ usuario: usuario._id, ticker: ordem.ticker });
                    
                    if (ativoNaCarteira && ativoNaCarteira.quantidade >= ordem.quantidade) {
                        usuario.saldoGeral += valorTotalOrdem;
                        await usuario.save();

                        await Transacao.create({
                            usuario: usuario._id,
                            tipo: "deposito",
                            valor: valorTotalOrdem,
                            descricao: `[EXECUÇÃO AUTOMÁTICA] Venda condicional de ${ordem.quantidade} ações de ${ordem.ticker}`,
                            minutoSimulacao: minutoAtual,
                            saldoResultante: usuario.saldoGeral
                        });

                        ativoNaCarteira.quantidade -= ordem.quantidade;
                        if (ativoNaCarteira.quantidade === 0) {
                            await Carteira.deleteOne({ _id: ativoNaCarteira._id });
                        } else {
                            await ativoNaCarteira.save();
                        }

                        ordem.status = 'executada';
                        ordem.minutoExecucao = minutoAtual;
                        ordem.precoReferencia = precoAtual;
                        await ordem.save();
                    } else {
                        ordem.status = 'falhada';
                        await ordem.save();
                    }
                }
            }
        }
    } catch (err) {
        console.error("Erro no processador de ordens automáticas:", err.message);
    }
}

const pegarTempo = async (req, res) => {
    try {
        const claims = auth.verifyToken(req, res);
        if (!claims) return res.status(401).json({ erro: "Não autorizado." });

        let mercado = await Mercado.findOne();
        if (!mercado) {
            mercado = await Mercado.create({ minutoAtual: 0 });
        }

        return res.status(200).json({ minutoAtual: mercado.minutoAtual });
    } catch (erro) {
        return res.status(500).json({ erro: "Erro ao buscar o tempo.", detalhe: erro.message });
    }
};

const avancarTempo = async (req, res) => {
    try {
        const claims = auth.verifyToken(req, res);
        if (!claims) return res.status(401).json({ erro: "Não autorizado." });

        const { minutos } = req.body;
        if (!minutos || isNaN(minutos) || minutos <= 0) {
            return res.status(400).json({ erro: "Quantidade de minutos inválida para o avanço." });
        }

        let mercado = await Mercado.findOne();
        if (!mercado) {
            mercado = await Mercado.create({ minutoAtual: 0 });
        }

        mercado.minutoAtual += Number(minutos);
        if (mercado.minutoAtual > 59) mercado.minutoAtual = 59; 
        
        await mercado.save();
        await processarOrdensCondicionaisAgendadas(mercado.minutoAtual);

        return res.status(200).json({
            mensagem: `Tempo avançado com sucesso.`,
            minutoAtual: mercado.minutoAtual
        });
    } catch (erro) {
        return res.status(500).json({ erro: "Erro ao avançar o tempo.", detalhe: erro.message });
    }
};

const adicionarAcaoInteresse = async (req, res) => {
    try {
        const claims = auth.verifyToken(req, res);
        if (!claims) return res.status(401).json({ erro: "Não autorizado." });

        const { ticker } = req.body;
        if (!ticker) return res.status(400).json({ erro: "O código da ação (ticker) é obrigatório." });

        await AcaoInteresse.findOneAndUpdate(
            { usuario: claims.user_id, ticker: ticker.toUpperCase() },
            { usuario: claims.user_id, ticker: ticker.toUpperCase() },
            { upsert: true, new: true }
        );

        return res.status(200).json({ 
            mensagem: `${ticker.toUpperCase()} foi adicionada à sua lista de interesse.` 
        });
    } catch (erro) {
        return res.status(500).json({ erro: "Erro ao adicionar ação.", detalhe: erro.message });
    }
};

const removerAcaoInteresse = async (req, res) => {
    try {
        const claims = auth.verifyToken(req, res);
        if (!claims) return res.status(401).json({ erro: "Não autorizado." });

        const { ticker } = req.params;

        const resultado = await AcaoInteresse.deleteOne({ 
            usuario: claims.user_id, 
            ticker: ticker.toUpperCase() 
        });

        if (resultado.deletedCount === 0) {
            return res.status(404).json({ erro: "Esta ação não estava na sua lista de interesse." });
        }

        return res.status(200).json({ 
            mensagem: `${ticker.toUpperCase()} foi removida da sua lista de interesse.` 
        });
    } catch (erro) {
        return res.status(500).json({ erro: "Erro ao remover ação.", detalhe: erro.message });
    }
};

// Listagem de acoes de interesse com as variações
const listarAcoesInteresse = async (req, res) => {
    try {
        const claims = auth.verifyToken(req, res);
        if (!claims) return res.status(401).json({ erro: "Não autorizado." });

        // Pega o tempo global
        let mercado = await Mercado.findOne();
        const minutoGlobal = mercado ? mercado.minutoAtual : 0;
        
        // Procura as ações favoritadas pelo usuário
        const minhasAcoesSalvas = await AcaoInteresse.find({ usuario: claims.user_id });
        const meusTickers = minhasAcoesSalvas.map(a => a.ticker);

        // Busca os preços de fechamento do dia anterior para calcular a variação
        let dadosFechamentoGeral = [];
        try {
            dadosFechamentoGeral = await precosService.obterFechamentoDiario();
        } catch (err) {
            console.error(" Falha ao carregar tickers.json, variações usarão fallback:", err.message);
        }

        const acoesParaATela = [];

        // Para cada ação favoritada, procura o preço no minuto atual ou vai voltando no tempo
        for (let ticker of meusTickers) {
            let precoEncontrado = null;
            
            for (let m = minutoGlobal; m >= 0; m--) {
                const precosHistoricos = await precosService.obterPrecosPorMinuto(m);
                const cotacao = precosHistoricos.find(p => p.ticker === ticker);
                
                if (cotacao) {
                    precoEncontrado = cotacao.preco;
                    break; 
                }
            }

            if (precoEncontrado !== null) {
                // Trocado fechamentosDiarios por dadosFechamentoGeral
                const fechamentoAcao = dadosFechamentoGeral.find(f => f.ticker === ticker);
                
                // Convertendo para Number de forma segura antes da matemática
                const precoFechamento = fechamentoAcao ? Number(fechamentoAcao.fechamento) : Number(precoEncontrado);
                const precoAtual = Number(precoEncontrado);

                // Matemática de variações 
                const variacaoNominal = precoAtual - precoFechamento;
                const variacaoPercentual = precoFechamento > 0 ? (variacaoNominal / precoFechamento) * 100 : 0;

                acoesParaATela.push({
                    ticker: ticker,
                    preco: precoAtual.toFixed(2),
                    variacaoNominal: variacaoNominal.toFixed(2), 
                    variacaoPercentual: variacaoPercentual.toFixed(2) 
                });
            }
        }

        return res.status(200).json({
            minutoAtual: minutoGlobal,
            acoes: acoesParaATela
        });

    } catch (erro) {
        return res.status(500).json({ erro: "Erro ao listar ações de interesse.", detalhe: erro.message });
    }
};

module.exports = {
    pegarTempo,
    avancarTempo,
    adicionarAcaoInteresse,
    removerAcaoInteresse,
    listarAcoesInteresse
};