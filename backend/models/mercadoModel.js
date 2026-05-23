let minutoAtual = 0;
let acoesInteresse = []; 

const obterTempo = () => minutoAtual;

const avancarTempo = (minutos) => {
    minutoAtual += minutos;
    return minutoAtual;
};

const obterAcoesInteresse = () => acoesInteresse;

const adicionarAcao = (ticker) => {
    // Só adiciona se já não estiver na lista
    if (!acoesInteresse.includes(ticker)) {
        acoesInteresse.push(ticker);
    }
};

const removerAcao = (ticker) => {
    // Filtra a lista removendo a ação escolhida
    acoesInteresse = acoesInteresse.filter(t => t !== ticker);
};

module.exports = { 
    obterTempo, 
    avancarTempo, 
    obterAcoesInteresse, 
    adicionarAcao, 
    removerAcao 
};