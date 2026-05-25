const precosService = require('../services/precosService');
const AcaoInteresse = require('../models/acaoInteresseModel');
const Ordem = require('../models/ordemModel');
const Carteira = require('../models/carteiraModel');
const Usuario = require('../models/usuarioModel');
const Transacao = require('../models/transacaoModel');
const auth = require('../auth/auth');

// Função auxiliar (automatização de ordens pendentes)
async function processarOrdensCondicionaisAgendadas(minutoAtual, userId) {
    try {
        //  Busca apenas as ordens pendentes do usuário logado que avançou o tempo
        const ordensPendentes = await Ordem.find({ status: 'pendente', usuario: userId });
        if (ordensPendentes.length === 0) return;

        // Pega os preços oficiais deste novo minuto simulado
        const precosAgora = await precosService.obterPrecosPorMinuto(minutoAtual);

        for (let ordem of ordensPendentes) {
            const cotacao = precosAgora.find(p => p.ticker === ordem.ticker.toUpperCase());
            if (!cotacao) continue;

            const precoAtual = cotacao.currentPrice || cotacao.preco;
            let dispararGatilho = false;

            // Condição: Compra quando o preço desce até o valor alvo (ou menos)
            if (ordem.tipoOrdem === 'compra' && precoAtual <= ordem.precoReferencia) {
                dispararGatilho = true;
            }
            // Condição: Venda quando o preço sobe até o valor alvo (ou mais)
            else if (ordem.tipoOrdem === 'venda' && precoAtual >= ordem.precoReferencia) {
                dispararGatilho = true;
            }

            if (dispararGatilho) {
                const usuario = await Usuario.findById(userId);
                if (!usuario) {
                    ordem.status = 'falhada';
                    await ordem.save();
                    continue;
                }

                const valorTotalOrdem = precoAtual * ordem.quantidade;

                if (ordem.tipoOrdem === 'compra') {
                    if (usuario.saldoGeral >= valorTotalOrdem) {
                        // Executa a compra deduzindo o saldo
                        usuario.saldoGeral -= valorTotalOrdem;
                        await usuario.save();

                        await Transacao.create({
                            usuario: userId,
                            tipo: "retirada",
                            valor: valorTotalOrdem,
                            descricao: `[EXECUÇÃO AUTOMÁTICA] Compra condicional de ${ordem.quantidade} ações de ${ordem.ticker}`,
                            minutoSimulacao: minutoAtual,
                            saldoResultante: usuario.saldoGeral // Grava fotografia do saldo pós-transação
                        });

                        // Atualiza Carteira
                        let ativoNaCarteira = await Carteira.findOne({ usuario: userId, ticker: ordem.ticker });
                        if (ativoNaCarteira) {
                            const novaQtd = ativoNaCarteira.quantidade + ordem.quantidade;
                            ativoNaCarteira.precoMedio = ((ativoNaCarteira.precoMedio * ativoNaCarteira.quantidade) + (precoAtual * ordem.quantidade)) / novaQtd;
                            ativoNaCarteira.quantidade = novaQtd;
                            await ativoNaCarteira.save();
                        } else {
                            await Carteira.create({ usuario: userId, ticker: ordem.ticker, quantidade: ordem.quantidade, precoMedio: precoAtual });
                        }

                        // Atualiza a Ordem para Executada
                        ordem.status = 'executada';
                        ordem.minutoExecucao = minutoAtual;
                        ordem.precoReferencia = precoAtual; // Salva o preço real de fechamento da operação
                        await ordem.save();
                    } else {
                        // Sem fundos suficientes no momento do disparo do gatilho
                        ordem.status = 'falhada';
                        await ordem.save();
                    }
                } 
                else if (ordem.tipoOrdem === 'venda') {
                    let ativoNaCarteira = await Carteira.findOne({ usuario: userId, ticker: ordem.ticker });
                    
                    if (ativoNaCarteira && ativoNaCarteira.quantidade >= ordem.quantidade) {
                        // Executa a venda adicionando fundos
                        usuario.saldoGeral += valorTotalOrdem;
                        await usuario.save();

                        await Transacao.create({
                            usuario: userId,
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

                        // Atualiza a Ordem para Executada
                        ordem.status = 'executada';
                        ordem.minutoExecucao = minutoAtual;
                        ordem.precoReferencia = precoAtual;
                        await ordem.save();
                    } else {
                        // Sem a quantidade necessária de ações em carteira na hora do disparo do gatilho
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

// Retorna o tempo do usuário logado
const pegarTempo = async (req, res) => {
    const claims = auth.verifyToken(req, res);
    if (!claims) return res.status(401).json({ erro: "Não autorizado." });

    const usuario = await Usuario.findById(claims.user_id);
    if (!usuario) return res.status(404).json({ erro: "Usuário não encontrado." });

    return res.status(200).json({ minutoAtual: usuario.minutoAtual });
};

// Avança o tempo do usuário logado no banco de dados e dispara a automatização
const avancarTempo = async (req, res) => {
    try {
        const claims = auth.verifyToken(req, res);
        if (!claims) return res.status(401).json({ erro: "Não autorizado." });

        const { minutos } = req.body;
        if (!minutos || isNaN(minutos) || minutos <= 0) {
            return res.status(400).json({ erro: "Quantidade de minutos inválida para o avanço." });
        }

        const usuario = await Usuario.findById(claims.user_id);
        if (!usuario) return res.status(404).json({ erro: "Usuário não encontrado." });

        // Avança o relógio deste usuário específico
        usuario.minutoAtual += Number(minutos);
        
        // Proteção para não passar do limite de 59 minutos da simulação do professor
        if (usuario.minutoAtual > 59) usuario.minutoAtual = 59; 
        
        await usuario.save();

        await processarOrdensCondicionaisAgendadas(usuario.minutoAtual, usuario._id);

        return res.status(200).json({
            mensagem: `Tempo avançado com sucesso.`,
            minutoAtual: usuario.minutoAtual
        });
    } catch (erro) {
        return res.status(500).json({ erro: "Erro ao avançar o tempo.", detalhe: erro.message });
    }
};

// Adiciona uma ação na lista de interesse do usuário logado
const adicionarAcaoInteresse = async (req, res) => {
    try {
        const claims = auth.verifyToken(req, res);
        if (!claims) return res.status(401).json({ erro: "Não autorizado." });

        const { ticker } = req.body;
        if (!ticker) return res.status(400).json({ erro: "O código da ação (ticker) é obrigatório." });

        // Guarda no MongoDB vinculando ao ID do usuário logado sem duplicar (Upsert)
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

// Remove uma ação da lista do usuário logado
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

// Lista as ações do usuário logado com os preços baseados no seu tempo individual
const listarAcoesInteresse = async (req, res) => {
    try {
        const claims = auth.verifyToken(req, res);
        if (!claims) return res.status(401).json({ erro: "Não autorizado." });

        const usuario = await Usuario.findById(claims.user_id);
        if (!usuario) return res.status(404).json({ erro: "Usuário não encontrado." });
        
        const minutoAtualUsuario = usuario.minutoAtual;
        
        // Procura apenas as ações favoritadas por este utilizador específico
        const minhasAcoesSalvas = await AcaoInteresse.find({ usuario: claims.user_id });
        const meusTickers = minhasAcoesSalvas.map(a => a.ticker);

        // Busca a lista de cotações com base no minuto real do usuário logado
        const todosOsPrecos = await precosService.obterPrecosPorMinuto(minutoAtualUsuario);

        // Filtra a resposta para devolver apenas os dados das ações que o utilizador favoritou
        const acoesFiltradas = todosOsPrecos.filter(acao => meusTickers.includes(acao.ticker.toUpperCase()));

        return res.status(200).json({
            minutoAtual: minutoAtualUsuario,
            acoes: acoesFiltradas
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