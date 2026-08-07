const Mercado = require('../models/mercadoModel');

// Função pura: vai ao banco, pega o tempo e devolve o objeto
const obterTempoGlobal = async () => {
    let mercado = await Mercado.findOne();
    
    // Se o mercado ainda não existir no banco, ele cria e já devolve 0
    if (!mercado) {
        mercado = await Mercado.create({ minutoAtual: 0, horaAtual: 0 });
    }
    
    return { minutoAtual: mercado.minutoAtual, horaAtual: mercado.horaAtual };
};

module.exports = {
    obterTempoGlobal
};