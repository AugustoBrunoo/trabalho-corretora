const Carteira = require('../models/carteiraModel');
const Usuario = require('../models/usuarioModel'); 
const Mercado = require('../models/mercadoModel');
const precosService = require('../services/precosService'); 
const auth = require('../auth/auth');

const consultarCarteira = async (req, res) => {
    try {
        // Identifica o utilizador logado pelo Token JWT
        const claims = auth.verifyToken(req, res);
        if (!claims) {
            return res.status(401).json({ erro: "Acesso não autorizado. Faça login primeiro." });
        }
        const userId = claims.user_id;
        
        // Busca o usuário no banco para capturar o saldoGeral
        const usuario = await Usuario.findById(userId);
        if (!usuario) {
            return res.status(404).json({ erro: "Usuário não encontrado." });
        }

        // busca o minuto atual global
        let mercado = await Mercado.findOne();
        const minutoAtual = mercado ? mercado.minutoAtual : 0;
        
        // Pega as ações que o utilizador possui guardadas no MongoDB
        const ativos = await Carteira.find({ usuario: userId });

        let valorTotalInvestidoCarteira = 0;
        let valorTotalAtualCarteira = 0;
        const carteiraComCalculos = [];

        // Junta a quantidade que o usuário tem com o preço e calcula os rendimentos
        for (let ativo of ativos) {
            let precoAtual = null;

            //  Volta no tempo se não achar cotação no minuto atual
            for (let m = minutoAtual; m >= 0; m--) {
                const precosHistoricos = await precosService.obterPrecosPorMinuto(m);
                const cotacao = precosHistoricos.find(p => p.ticker === ativo.ticker.toUpperCase());
                
                if (cotacao) {
                    precoAtual = cotacao.currentPrice || cotacao.preco;
                    break; // Achou o preço mais recente, para a busca!
                }
            }

            // Se por algum motivo bizarro não achar a cotação na API inteira, usa o preço médio como segurança
            if (precoAtual === null) {
                precoAtual = ativo.precoMedio;
            }

            // Cálculo dos investimentos individuais
            const valorInvestido = ativo.quantidade * ativo.precoMedio;
            const valorAtual = ativo.quantidade * precoAtual;
            const lucroOuPrejuizo = valorAtual - valorInvestido;

            // Soma para os totais gerais da carteira
            valorTotalInvestidoCarteira += valorInvestido;
            valorTotalAtualCarteira += valorAtual;

            carteiraComCalculos.push({
                ticker: ativo.ticker,
                quantidade: ativo.quantidade,
                precoMedio: Number(ativo.precoMedio).toFixed(2),
                precoAtual: Number(precoAtual).toFixed(2),
                valorTotalAtual: valorAtual.toFixed(2),
                resultado: lucroOuPrejuizo.toFixed(2)
            });
        }

        // Retorna o resumo completo, formatado e sincronizado com o banco para o Frontend
        return res.status(200).json({
            minutoReferencia: minutoAtual,
            saldoDisponivel: usuario.saldoGeral.toFixed(2),
            resumo: {
                totalInvestido: valorTotalInvestidoCarteira.toFixed(2),
                patrimonioAtivos: valorTotalAtualCarteira.toFixed(2),
                patrimonioTotal: (usuario.saldoGeral + valorTotalAtualCarteira).toFixed(2), 
                lucroPrejuizoTotal: (valorTotalAtualCarteira - valorTotalInvestidoCarteira).toFixed(2)
            },
            ativos: carteiraComCalculos
        });

    } catch (erro) {
        return res.status(500).json({ 
            erro: "Erro ao calcular os dados da carteira.",
            detalhe: erro.message 
        });
    }
};

module.exports = {
    consultarCarteira
};