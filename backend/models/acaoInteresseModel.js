const mongoose = require('mongoose');

const acaoInteresseSchema = new mongoose.Schema({
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
    ticker: { type: String, required: true }
}, { timestamps: true });

// Garante que o mesmo utilizador não adiciona o mesmo ticker duas vezes
acaoInteresseSchema.index({ usuario: 1, ticker: 1 }, { unique: true });

module.exports = mongoose.model('AcaoInteresse', acaoInteresseSchema);