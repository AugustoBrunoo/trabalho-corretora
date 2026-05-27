const obterPrecosPorMinuto = async (minutoRelatorio) => {
    // Cria um controlador para conseguir abortar o fetch se ele demorar demais
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000); 
    
    try {
        const minuto = minutoRelatorio % 60;
        const urlDoProfessor = `https://raw.githubusercontent.com/marciobarros/dsw-simulador-corretora/refs/heads/main/${minuto}.json`;

        // Passamos o signal do controller para o fetch monitorar o tempo
        const resposta = await fetch(urlDoProfessor, { signal: controller.signal });

        // Se chegou até aqui antes dos 3 segundos, cancelamos o cronômetro seguro
        clearTimeout(timeoutId);

        if (!resposta.ok) {
            throw new Error(`Não foi possível buscar os preços para o arquivo ${minuto}.json (Status: ${resposta.status})`);
        }

        const dadosDasAcoes = await resposta.json();
        return dadosDasAcoes; 

    } catch (erro) {
        clearTimeout(timeoutId); // Garante que o cronômetro seja limpo em caso de qualquer erro

        // Verifica se o erro foi causado pelo nosso limite de tempo (Timeout)
        if (erro.name === 'AbortError') {
            console.error(`🚨 [PrecosService] O GitHub demorou mais de 3 segundos para responder o minuto ${minutoRelatorio % 60}. Requisito cancelado.`);
            throw new Error("A API de preços do professor está instável ou demorou demais para responder.");
        }

        console.error("Erro no PrecosService:", erro.message);
        throw erro; 
    }
};

module.exports = {
    obterPrecosPorMinuto
};