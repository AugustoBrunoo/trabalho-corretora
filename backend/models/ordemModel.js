const mongoose = require('mongoose');

const ordemSchema = new mongoose.Schema({
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
    minutoRegistro: { type: Number, required: true },
    minutoExecucao: { type: Number, default: null },
    tipoOrdem: { type: String, enum: ['compra', 'venda'], required: true },
    ticker: { type: String, required: true, uppercase: true },
    quantidade: { type: Number, required: true },
    tipoExecucao: { type: String, enum: ['mercado', 'condicional'], required: true },
    precoReferencia: { type: Number, default: null },
    status: { type: String, enum: ['pendente', 'executada', 'cancelada'], default: 'pendente' }
}, { timestamps: true });

module.exports = mongoose.model('Ordem', ordemSchema);