const mongoose = require('mongoose');

const transacaoSchema = new mongoose.Schema({
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
    tipo: { type: String, enum: ['deposito', 'retirada'], required: true },
    valor: { type: Number, required: true },
    descricao: { type: String, required: true },
    minutoSimulacao: { type: Number, required: true },
    saldoResultante: { type: Number, required: true }
}, { timestamps: true }); 
module.exports = mongoose.model('Transacao', transacaoSchema);