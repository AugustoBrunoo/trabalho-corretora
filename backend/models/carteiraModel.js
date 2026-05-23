// simula que já comprou ações para o teste
let ativosCarteira = [
    { ticker: 'PETR4', quantidade: 100, precoMedio: 30.00 }, 
    { ticker: 'VALE3', quantidade: 50, precoMedio: 65.50 }   
];

const obterCarteira = () => ativosCarteira;

// OrdemController vai utilizar essa função quando comprarem ações
const adicionarAtivo = (ticker, quantidade, precoAtual) => {
    const ativoExistente = ativosCarteira.find(a => a.ticker === ticker);

    if (ativoExistente) {
        // Se já tem a ação, faz o cálculo do Preço Médio
        const valorTotalAntigo = ativoExistente.quantidade * ativoExistente.precoMedio;
        const valorTotalNovo = quantidade * precoAtual;
        ativoExistente.quantidade += quantidade;
        ativoExistente.precoMedio = (valorTotalAntigo + valorTotalNovo) / ativoExistente.quantidade;
    } else {
        // Se é uma ação nova na carteira
        ativosCarteira.push({ ticker, quantidade, precoMedio: precoAtual });
    }
};

module.exports = {
    obterCarteira,
    adicionarAtivo
};