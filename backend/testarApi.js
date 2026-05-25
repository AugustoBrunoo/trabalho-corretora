const precosService = require('./services/precosService');

async function testar() {
    console.log(" Tentando conectar à API do professor para o minuto 0...");
    try {
        // Tenta buscar os preços do minuto inicial
        const precos = await precosService.obterPrecosPorMinuto(0);
        
        if (precos && precos.length > 0) {
            console.log(" Conexão estabelecida com sucesso!");
            console.log(` Total de ações retornadas pela API: ${precos.length}`);
            console.log(" Amostra das primeiras 3 ações:");
            console.log(precos.slice(0, 3));
        } else {
            console.log(" A API respondeu, mas retornou uma lista vazia.");
        }
    } catch (error) {
        console.error(" Erro ao conectar na API do professor:");
        console.error(error.message);
    }
}

testar();