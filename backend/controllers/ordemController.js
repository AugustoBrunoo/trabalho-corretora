const ordemModel = require('../models/ordemModel');
const carteiraModel = require('../models/carteiraModel');

const pegarOrdem = (req, res) => {

    const {usuario,
    acao,
    ticker,
    quantidade,
    tipo,
    precoAlvo} = req.body;

    const precoAtual = 50;

    if(tipo === "mercado"){
        const valorTotal = quantidade * precoAtual;
        const saldo = 1000000000000;

        if(saldo < valorTotal){
           return res.status(400).json({
            erro:"Saldo insuficiente"
           });
        }

        /// debitar da conta

        carteiraModel.adicionarAtivo(
            acao,
            quantidade,
            precoAtual
        );

        const ordem = ordemModel.criarOrdem(
         usuario,
         "compra",
          ticker,
         quantidade,
         tipo,
         precoAlvo
      );

      // altera status
      ordem.status = "executada";

      return res.json(ordem);

    }

    if(tipo === "condicional"){

      const ordem = ordemModel.criarOrdem(
         usuario,
         "compra",
          ticker,
         quantidade,
         tipo,
         precoAlvo
      );

      return res.json(ordem);
   }

   return res.status(400).json({
      erro: "Tipo inválido"
   });
};

module.exports = {
   pegarOrdem
};
    