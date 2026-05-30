const mongoose = require('mongoose');

const acaoInteresseSchema = new mongoose.Schema({
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
    ticker: { type: String, required: true }
}, { timestamps: true });

// Garante que o mesmo usuário não adicione o mesmo ticker duas vezes
acaoInteresseSchema.index({ usuario: 1, ticker: 1 }, { unique: true });

module.exports = mongoose.model('AcaoInteresse', acaoInteresseSchema);