const Carteira = require('../models/carteiraModel');
const Usuario = require('../models/usuarioModel'); // [INCLUÍDO] para buscar o tempo e saldo real do usuário
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
        
        //Busca o usuário no banco para capturar o minutoAtual e o saldoGeral persistidos individualmente
        const usuario = await Usuario.findById(userId);
        if (!usuario) {
            return res.status(404).json({ erro: "Usuário não encontrado." });
        }

        const minutoAtual = usuario.minutoAtual;
        
        // Pega as ações que o utilizador possui guardadas no MongoDB
        const ativos = await Carteira.find({ usuario: userId });
        
        // Vai buscar os preços atualizados à API do professor usando o minuto real do usuário
        const todosOsPrecos = await precosService.obterPrecosPorMinuto(minutoAtual);

        let valorTotalInvestidoCarteira = 0;
        let valorTotalAtualCarteira = 0;

        // Junta a quantidade que o utilizador tem com o preço de agora e calcula os rendimentos
        const carteiraComCalculos = ativos.map(ativo => {
            // Procura o preço atual desta ação específica na API do professor
            const cotacao = todosOsPrecos.find(p => p.ticker === ativo.ticker.toUpperCase());
            
            // Se por algum motivo não achar a cotação na API, usa o preço médio como segurança
            const precoAtual = cotacao ? (cotacao.currentPrice || cotacao.preco) : ativo.precoMedio; 

            // Cálculo dos investimentos individuais
            const valorInvestido = ativo.quantidade * ativo.precoMedio;
            const valorAtual = ativo.quantidade * precoAtual;
            const lucroOuPrejuizo = valorAtual - valorInvestido;

            // Soma para os totais gerais da carteira
            valorTotalInvestidoCarteira += valorInvestido;
            valorTotalAtualCarteira += valorAtual;

            return {
                ticker: ativo.ticker,
                quantidade: ativo.quantidade,
                precoMedio: Number(ativo.precoMedio).toFixed(2),
                precoAtual: Number(precoAtual).toFixed(2),
                valorTotalAtual: valorAtual.toFixed(2),
                resultado: lucroOuPrejuizo.toFixed(2)
            };
        });

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
            dethe: erro.message 
        });
    }
};

module.exports = {
    consultarCarteira
};