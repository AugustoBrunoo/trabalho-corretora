
const qtdUsuarios = [];

const Usuario = {
    nome: String,
    email: String,
    senha: String
};

function novaConta(Usuario){
    qtdUsuarios = Usuario;

}

module.exports = {
    novaConta
};