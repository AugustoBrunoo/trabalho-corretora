const obterPrecosPorMinuto = async (minutoRelatorio) => {
    try {
        const minuto = minutoRelatorio % 60;
        const urlDoProfessor = `https://raw.githubusercontent.com/marciobarros/dsw-simulador-corretora/refs/heads/main/${minuto}.json`;

        const resposta = await fetch(urlDoProfessor);

        if (!resposta.ok) {
            throw new Error(`Não foi possível buscar os preços para o arquivo ${minuto}.json`);
        }

        const dadosDasAcoes = await resposta.json();
        return dadosDasAcoes; 

    } catch (erro) {
        console.error("Erro no PrecosService:", erro.message);
        throw erro; 
    }
};

module.exports = {
    obterPrecosPorMinuto
};