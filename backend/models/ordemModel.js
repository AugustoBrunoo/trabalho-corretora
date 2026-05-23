const guardarOrdens = [];

const criarOrdem = (dadosOrdem) => {
    const novaOrdem = {
        id: Date.now(),
        usuario: dadosOrdem.usuario,
        minutoRegistro: dadosOrdem.minutoRegistro,
        minutoExecucao: dadosOrdem.minutoExecucao || null,
        tipoOrdem: dadosOrdem.tipoOrdem, // 'compra' ou 'venda'
        ticker: dadosOrdem.ticker.toUpperCase(),
        quantidade: parseInt(dadosOrdem.quantidade),
        tipoExecucao: dadosOrdem.tipoExecucao, // 'mercado' ou 'condicional'
        precoReferencia: parseFloat(dadosOrdem.precoReferencia) || null,
        status: dadosOrdem.status || "pendente"
    };

    guardarOrdens.push(novaOrdem);
    return novaOrdem;
};

const obterTodasOrdens = () => {
    return guardarOrdens;
};

const atualizarStatusOrdem = (id, novoStatus) => {
    const ordem = guardarOrdens.find(o => o.id === parseInt(id));
    if (ordem) {
        ordem.status = novoStatus;
        return ordem;
    }
    return null;
};

module.exports = {
    criarOrdem,
    obterTodasOrdens,
    atualizarStatusOrdem
};