const express = require('express');
const cors = require('cors');

const contaRoutes = require('./routes/contaRoutes');
const mercadoRoutes = require('./routes/mercadoRoutes');
const precosService = require('./services/precosService');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(cors()); 
app.use(express.json()); 

// Ligando as rotas 
app.use('/api/conta', contaRoutes);
app.use('/api/mercado', mercadoRoutes); 
app.use('/api/auth', authRoutes);

const PORTA = 3000;
app.listen(PORTA, () => {
    console.log(`OK. Servidor rodando na porta ${PORTA}`);
});