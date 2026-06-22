const Ordem = require('../models/ordemModel');
const Carteira = require('../models/carteiraModel');
const Usuario = require('../models/usuarioModel');
const Transacao = require('../models/transacaoModel');
const Mercado = require('../models/mercadoModel'); 
const mercadoService = require('../services/mercadoService');
const precosService = require('../services/precosService');
const auth = require('../auth/auth');

const processarOrdem = async (req, res) => {
    try {
        // Identifica o usuário logado pelo Token JWT
        const claims = auth.verifyToken(req, res);
        if (!claims) {
            return res.status(401).json({ erro: "Acesso não autorizado. Faça login primeiro." });
        }
        const userId = claims.user_id;

        const { ticker, quantidade, tipoOrdem, tipoExecucao, precoReferencia } = req.body;

        // Verifica se tem campo obrigatório vazio
        if (!ticker || !quantidade || quantidade <= 0 || !tipoOrdem || !tipoExecucao) {
            return res.status(400).json({ erro: "Campos obrigatórios ausentes ou quantidade inválida." });
        }

        // Busca o usuário no banco de dados para validar saldos
        const usuario = await Usuario.findById(userId);
        if (!usuario) {
            return res.status(404).json({ erro: "Usuário não encontrado." });
        }

        // busca o tempo global
        const minutoAtual = await mercadoService.obterMinutoGlobal();

        // LÓGICA PARA ORDENS DE MERCADO
        if (tipoExecucao === 'mercado') {
            const precos = await precosService.obterPrecosPorMinuto(minutoAtual);
            const cotacao = precos.find(p => p.ticker === ticker.toUpperCase());
            
            if (!cotacao) {
                return res.status(404).json({ erro: `Ação ${ticker.toUpperCase()} não encontrada no mercado para o minuto ${minutoAtual}.` });
            }
            
            const precoAtual = cotacao.preco;
            const valorTotalOrdem = precoAtual * quantidade;

            const valorTotalCalculado = precoAtual * quantidade;

            // sub-lógica de compra a mercado
            if (tipoOrdem === 'compra') {
                if (usuario.saldoGeral < valorTotalCalculado) {
                    return res.status(400).json({ 
                        erro: "Saldo insuficiente para realizar a compra.", 
                        saldoAtual: usuario.saldoGeral, 
                        custoNecessario: valorTotalCalculado 
                    });
                }

                // Reduz o saldo do usuário
                usuario.saldoGeral -= valorTotalCalculado;
                await usuario.save();

                // grava fotografia do saldo resultante e o minuto da simulação
                await Transacao.create({
                    usuario: userId,
                    tipo: "retirada",
                    valor: valorTotalCalculado,
                    minutoSimulacao: minutoAtual,
                    saldoResultante: usuario.saldoGeral,
                    descricao: `Compra a mercado de ${quantidade} ações de ${ticker.toUpperCase()}`
                });

                // Atualiza ou adiciona o ativo na Carteira do Usuário
                let ativoNaCarteira = await Carteira.findOne({ usuario: userId, ticker: ticker.toUpperCase() });
                
                if (ativoNaCarteira) {
                    const novaQuantidade = ativoNaCarteira.quantidade + quantidade;
                    const novoPrecoMedio = ((ativoNaCarteira.precoMedio * ativoNaCarteira.quantidade) + (precoAtual * quantidade)) / novaQuantidade;
                    
                    ativoNaCarteira.quantidade = novaQuantidade;
                    ativoNaCarteira.precoMedio = novoPrecoMedio;
                    await ativoNaCarteira.save();
                } else {
                    await Carteira.create({
                        usuario: userId,
                        ticker: ticker.toUpperCase(),
                        quantidade: quantidade,
                        precoMedio: precoAtual
                    });
                }
                
                // Salva o registro da Ordem Executada no banco
                const ordemSalva = await Ordem.create({
                    usuario: userId, minutoRegistro: minutoAtual, minutoExecucao: minutoAtual,
                    tipoOrdem: 'compra', ticker: ticker.toUpperCase(), quantidade, tipoExecucao,
                    precoReferencia: precoAtual, status: 'executada'
                });

                return res.status(200).json({ mensagem: "Ordem de compra a mercado executada com sucesso!", ordem: ordemSalva });
            } 
            
            // sub-lógica de venda a mercado
            else if (tipoOrdem === 'venda') {
                const ativoNaCarteira = await Carteira.findOne({ usuario: userId, ticker: ticker.toUpperCase() });

                if (!ativoNaCarteira || ativoNaCarteira.quantidade < quantidade) {
                    return res.status(400).json({ erro: "Você não possui quantidade suficiente desta ação para vender." });
                }

                // Incrementa o dinheiro na conta do usuário
                usuario.saldoGeral += valorTotalCalculado;
                await usuario.save();

                // grava o saldo resultante e o minuto correto do sistema
                await Transacao.create({
                    usuario: userId,
                    tipo: "deposito",
                    valor: valorTotalCalculado,
                    minutoSimulacao: minutoAtual,
                    saldoResultante: usuario.saldoGeral,
                    descricao: `Venda a mercado de ${quantidade} ações de ${ticker.toUpperCase()}`
                });

                // Atualiza a quantidade de ações na carteira
                ativoNaCarteira.quantidade -= quantidade;
                if (ativoNaCarteira.quantidade === 0) {
                    await Carteira.deleteOne({ _id: ativoNaCarteira._id });
                } else {
                    await ativoNaCarteira.save();
                }

                // Salva o registro da Ordem Executada no banco
                const ordemSalva = await Ordem.create({
                    usuario: userId, minutoRegistro: minutoAtual, minutoExecucao: minutoAtual,
                    tipoOrdem: 'venda', ticker: ticker.toUpperCase(), quantidade, tipoExecucao,
                    precoReferencia: precoAtual, status: 'executada'
                });

                return res.status(200).json({ mensagem: "Ordem de venda a mercado executada com sucesso!", ordem: ordemSalva });
            }
        } 
        
        // LÓGICA PARA ORDENS CONDICIONAIS
        else if (tipoExecucao === 'condicional') {
            if (!precoReferencia || precoReferencia <= 0) {
                return res.status(400).json({ erro: "Para ordens condicionais, informe um preço de referência válido." });
            }

            // Impede agendar compras absurdas sem saldo inicial
            if (tipoOrdem === 'compra') {
                const custoEstimado = precoReferencia * quantidade;
                if (usuario.saldoGeral < custoEstimado) {
                    return res.status(400).json({ erro: `Você não possui saldo suficiente para agendar esta ordem. Custo estimado: R$ ${custoEstimado.toFixed(2)}` });
                }
            }

            // Impede agendar vendas de ativos que não possui
            if (tipoOrdem === 'venda') {
                const ativoNaCarteira = await Carteira.findOne({ usuario: userId, ticker: ticker.toUpperCase() });
                if (!ativoNaCarteira || ativoNaCarteira.quantidade < quantidade) {
                    return res.status(400).json({ erro: "Você não possui ações suficientes em carteira para agendar esta venda." });
                }
            }

            // Apenas registra como pendente no banco para o robô processar quando o tempo avançar
            const ordemSalva = await Ordem.create({
                usuario: userId, 
                minutoRegistro: minutoAtual,
                tipoOrdem, 
                ticker: ticker.toUpperCase(), 
                quantidade, 
                tipoExecucao,
                precoReferencia, 
                status: 'pendente'
            });

            return res.status(200).json({ mensagem: "Ordem condicional registrada e aguardando gatilho de preço na simulação.", ordem: ordemSalva });
        }

    } catch (erro) {
        return res.status(500).json({ erro: "Erro interno ao processar a ordem.", detalhes: erro.message });
    }
};

// Listar apenas as ordens pendentes do usuário logado
const listarOrdensPendentes = async (req, res) => {
    try {
        const claims = auth.verifyToken(req, res);
        if (!claims) return res.status(401).json({ erro: "Acesso não autorizado." });

        const pendentes = await Ordem.find({ usuario: claims.user_id, status: 'pendente' });
        
        // feedback para caso a lista de pendentes esteja vazia
        if (pendentes.length === 0) {
            return res.status(200).json({ mensagem: "Você não possui ordens pendentes no momento." });
        }

        return res.status(200).json(pendentes);
    } catch (erro) {
        return res.status(500).json({ erro: "Erro ao listar ordens pendentes.", detalhes: erro.message });
    }
};

// Cancelar uma ordem condicional pendente
const cancelarOrdemCondicional = async (req, res) => {
    try {
        const claims = auth.verifyToken(req, res);
        if (!claims) return res.status(401).json({ erro: "Acesso não autorizado." });

        const { id } = req.params;

        // Mantemos a declaração original da sua equipe
        const minutoGlobal = await mercadoService.obterMinutoGlobal();

        const ordemCancelada = await Ordem.findOneAndUpdate(
            { _id: id, usuario: claims.user_id, status: 'pendente' },
            { status: 'cancelada', minutoExecucao: minutoGlobal }, 
            { new: true }
        );
        
        if (!ordemCancelada) {
            return res.status(404).json({ erro: "Ordem não encontrada ou já processada/cancelada." });
        }
        
        return res.status(200).json({ mensagem: "Ordem condicional cancelada com sucesso.", ordem: ordemCancelada });
    } catch (erro) {
        return res.status(500).json({ erro: "Erro ao cancelar ordem.", detalhes: erro.message });
    }
};

// Histórico completo de ordens do usuário logado
const exibirHistoricoOrdens = async (req, res) => {
    try {
        const claims = auth.verifyToken(req, res);
        if (!claims) return res.status(401).json({ erro: "Acesso não autorizado." });

        const todas = await Ordem.find({ usuario: claims.user_id }).sort({ createdAt: -1 });
        return res.status(200).json(todas);
    } catch (erro) {
        return res.status(500).json({ erro: "Erro ao buscar histórico de ordens.", detalhes: erro.message });
    }
};

module.exports = {
    processarOrdem,
    listarOrdensPendentes,
    cancelarOrdemCondicional,
    exibirHistoricoOrdens
};