const carteiraModel = require('../models/carteiraModel');
const mercadoModel = require('../models/mercadoModel'); 
const precosService = require('../services/precosService'); 

const consultarCarteira = async (req, res) => {
    try {
        // Pega nas ações que o utilizador possui
        const ativos = carteiraModel.obterCarteira();
        
        //  Pega no minuto atual do simulador
        const minutoAtual = mercadoModel.obterTempo();

        //  Vai buscar os preços atualizados à API do professor
        const todosOsPrecos = await precosService.obterPrecosPorMinuto(minutoAtual);

        let valorTotalInvestidoCarteira = 0;
        let valorTotalAtualCarteira = 0;

        //  junta a quantidade que o utilizador tem com o preço de agora
        const carteiraComCalculos = ativos.map(ativo => {
            // Procura o preço atual desta ação específica
            const cotacao = todosOsPrecos.find(p => p.ticker === ativo.ticker);
            
            // Se por algum motivo não achar a cotação, usa o preço médio como segurança
            const precoAtual = cotacao ? cotacao.currentPrice || cotacao.preco : ativo.precoMedio; 

            // calculo de investimentos
            const valorInvestido = ativo.quantidade * ativo.precoMedio;
            const valorAtual = ativo.quantidade * precoAtual;
            const lucroOuPrejuizo = valorAtual - valorInvestido;

            // Soma para os totais gerais da carteira
            valorTotalInvestidoCarteira += valorInvestido;
            valorTotalAtualCarteira += valorAtual;

            return {
                ticker: ativo.ticker,
                quantidade: ativo.quantidade,
                precoMedio: ativo.precoMedio.toFixed(2),
                precoAtual: precoAtual,
                valorTotalAtual: valorAtual.toFixed(2),
                resultado: lucroOuPrejuizo.toFixed(2)
            };
        });

        return res.status(200).json({
            minutoReferencia: minutoAtual,
            resumo: {
                totalInvestido: valorTotalInvestidoCarteira.toFixed(2),
                patrimonioAtual: valorTotalAtualCarteira.toFixed(2),
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