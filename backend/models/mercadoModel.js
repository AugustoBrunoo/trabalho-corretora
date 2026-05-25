let minutoAtual = 0; 

const obterTempo = () => minutoAtual;

const avancarTempo = (minutos) => {
    minutoAtual += minutos;
    return minutoAtual;
};

module.exports = { 
    obterTempo, 
    avancarTempo 
};