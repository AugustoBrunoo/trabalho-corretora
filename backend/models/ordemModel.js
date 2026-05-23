//const { obterTransacoes } = require("./transacaoModel");

const guardarOrdens = [];

const criarOrdem = (
    usuario,
    acao,
    ticker,
    quantidade,
    tipo,
    precoAlvo
) => {
    const novaOrdem = {
        id : Date.now(),
        usuario : usuario,
        acao : acao,
        ticker : ticker,
        quantidade : quantidade,
        tipo : tipo,
        precoAlvo : precoAlvo,
        status : "pendente"
    };

    guardarOrdens.push(novaOrdem);

    return novaOrdem;
}

module.exports = {
    criarOrdem,
    guardarOrdens
};

