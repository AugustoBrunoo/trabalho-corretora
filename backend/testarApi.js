/*
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
*/

const precosService = require('./services/precosService');

async function testarTodosOsMinutos() {
    console.log(" Iniciando varredura completa da API do professor (Minutos 0 a 59)...\n");
    
    // Laço de repetição de 0 a 59
    for (let minuto = 0; minuto <= 59; minuto++) {
        console.log(` Buscando preços para o Minuto [${minuto}]...`);
        
        try {
            // O await garante que o laço espera a resposta desta requisição antes de ir para o próximo minuto
            const precos = await precosService.obterPrecosPorMinuto(minuto);
            
            if (precos && precos.length > 0) {
                console.log(`✅ Minuto ${minuto} OK! Total de ações: ${precos.length}`);
                // Mostra uma amostra rápida da primeira ação só para confirmar os dados
                console.log(`   Exemplo de ativo: ${precos[0].ticker || 'Sem ticker'} - R$ ${precos[0].preco || precos[0].valor || 0}`);
            } else {
                console.log(`⚠️ Minuto ${minuto}: A API respondeu, mas a lista veio vazia.`);
            }
            
        } catch (error) {
            console.error(`❌ Erro detectado no Minuto ${minuto}:`);
            console.error(`   ${error.message}`);
        }
        
        console.log("---------------------------------------------------------");
    }
    
    console.log("🏁 Teste de varredura finalizado!");
}

// Executa a função de teste
testarTodosOsMinutos();