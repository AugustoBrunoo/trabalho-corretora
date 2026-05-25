const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    senha: { type: String, required: true },
    falhasLogin: { type: Number, default: 0 },
    saldoGeral: { type: Number, default: 0 },
    minutoAtual: { type: Number, default: 0 },
    tokenSenha: { type: String, default: null },
    dataTokenSenha: { type: Date, default: null }
}, { 
    timestamps: true // Cria automaticamente os campos createdAt e updatedAt (dataRegistro e dataAtualizacao)
});

module.exports = mongoose.model('Usuario', usuarioSchema);