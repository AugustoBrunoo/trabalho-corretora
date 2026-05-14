const tabelaTransacoes = []; 

const registrarTransacao = (tipo, valor, descricao) => {
    const novaTransacao = {
        id: Date.now(), // Gera um número único
        tipo: tipo,
        valor: valor,
        descricao: descricao,
        data: new Date() // Depois vamos trocar isso pelo relógio simulado do trabalho
    };
    
    // "Salva" no banco de dados (nosso array)
    tabelaTransacoes.push(novaTransacao);
    
    return novaTransacao;
};

module.exports = {
    registrarTransacao
};