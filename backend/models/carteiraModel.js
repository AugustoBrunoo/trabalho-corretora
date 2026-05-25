const mongoose = require('mongoose');

const carteiraSchema = new mongoose.Schema({
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true }, 
    ticker: { type: String, required: true, uppercase: true },
    quantidade: { type: Number, required: true },
    precoMedio: { type: Number, required: true }
}, { 
    timestamps: true 
});

module.exports = mongoose.model('Carteira', carteiraSchema);