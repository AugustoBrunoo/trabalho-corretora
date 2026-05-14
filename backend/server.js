const express = require('express');
const cors = require('cors');
const contaRoutes = require('./routes/contaRoutes');
const precosService = require('./services/precosService');

const app = express();

app.use(cors()); 
app.use(express.json()); 

// Ligando as rotas da conta
app.use('/api/conta', contaRoutes); 

const PORTA = 3000;
app.listen(PORTA, () => {
    console.log(`OK. Servidor rodando na porta ${PORTA}`);
    
    // teste de serviços de preços
    console.log(" Buscando as cotações no GitHub do professor...");
    
    // Testa puxar o arquivo do minuto 10
    precosService.obterPrecosPorMinuto(10)
        .then(dados => {
            console.log("\n Sucesso! cotações do minuto 10: ");
            console.log(dados); 
            console.log("=========================================\n");
        })
        .catch(erro => {
            console.log("\n Erro no Teste!");
            console.log(erro.message);
            console.log("========================\n");
        });
});