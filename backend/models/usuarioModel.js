const tabelaUsuarios = []; 

const buscarPorEmail = (email) => {
    return tabelaUsuarios.find(u => u.email === email);
};

const buscarPorId = (id) => {
    return tabelaUsuarios.find(u => u.id === id);
};

const criarUsuario = (dadosDoUsuario) => {
    const novoUsuario = {
        id: Date.now(),
        dataRegistro: new Date(),
        dataAtualizacao: new Date(),
        falhasLogin: 0,
        saldoGeral: 0,
        tokenSenha: null,      // Armazena o token de recuperação 
        dataTokenSenha: null,  // Armazena quando o token foi criado para checar o vencimento
        ...dadosDoUsuario
    };
    tabelaUsuarios.push(novoUsuario);
    return novoUsuario;
};

const atualizarUsuario = (usuarioAtualizado) => {
    const index = tabelaUsuarios.findIndex(u => u.id === usuarioAtualizado.id);
    if (index !== -1) {
        tabelaUsuarios[index] = usuarioAtualizado;
        return true;
    }
    return false;
};

module.exports = {
    buscarPorEmail,
    buscarPorId,
    criarUsuario,
    atualizarUsuario
};