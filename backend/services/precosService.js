let cacheUltimoMinuto = null;

const obterPrecosPorMinuto = async (minutoRelatorio) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000); 
    const minuto = Math.abs(minutoRelatorio) % 60; // Garante sempre um valor de 0 a 59

    try {
        const urlDoProfessor = `https://raw.githubusercontent.com/marciobarros/dsw-simulador-corretora/refs/heads/main/${minuto}.json`;
        const resposta = await fetch(urlDoProfessor, { signal: controller.signal });

        clearTimeout(timeoutId);

        if (!resposta.ok) {
            throw new Error(`Não foi possível buscar os preços para o arquivo ${minuto}.json (Status: ${resposta.status})`);
        }

        const dadosDasAcoes = await resposta.json();
        
        // Atualiza o cache em caso de sucesso
        cacheUltimoMinuto = dadosDasAcoes;
        return dadosDasAcoes; 

    } catch (erro) {
        clearTimeout(timeoutId);

        if (erro.name === 'AbortError') {
            console.error(`🚨 [PrecosService] Timeout no minuto ${minuto}.`);
        } else {
            console.error("Erro no PrecosService:", erro.message);
        }

        // Se houver dados em cache, entrega o cache para a aplicação não parar
        if (cacheUltimoMinuto) {
            console.log(`⚠️ [PrecosService] Usando dados em cache do último minuto válido.`);
            return cacheUltimoMinuto;
        }

        throw erro; 
    }
};

const obterFechamentoDiario = async () => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000); 

    try {
        const urlTickers = `https://raw.githubusercontent.com/marciobarros/dsw-simulador-corretora/refs/heads/main/tickers.json`;
        const resposta = await fetch(urlTickers, { signal: controller.signal });
        clearTimeout(timeoutId);

        if (!resposta.ok) {
            throw new Error(`Não foi possível buscar o arquivo tickers.json (Status: ${resposta.status})`);
        }

        return await resposta.json();

    } catch (erro) {
        clearTimeout(timeoutId);
        console.error("Erro ao buscar fechamento no PrecosService:", erro.message);
        throw erro;
    }
};

module.exports = {
    obterPrecosPorMinuto,
    obterFechamentoDiario 
};