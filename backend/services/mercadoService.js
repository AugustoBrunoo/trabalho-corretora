const Mercado = require('../models/mercadoModel');

// Função pura: vai ao banco, pega o tempo e devolve apenas o número
const obterMinutoGlobal = async () => {
    let mercado = await Mercado.findOne();
    
    // Se o mercado ainda não existir no banco, ele cria e já devolve 0
    if (!mercado) {
        mercado = await Mercado.create({ minutoAtual: 0 });
    }
    
    return mercado.minutoAtual;
};

module.exports = {
    obterMinutoGlobal
};