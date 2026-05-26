const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); 
require('dotenv').config(); 

const contaRoutes = require('./routes/contaRoutes');
const mercadoRoutes = require('./routes/mercadoRoutes');
const carteiraRoutes = require('./routes/carteiraRoutes');
const precosService = require('./services/precosService');
const authRoutes = require('./routes/authRoutes');
const ordemRoutes = require('./routes/ordemRoutes');

const app = express();

app.use(cors()); 
app.use(express.json()); 

// Ligando as rotas 
app.use('/api/conta', contaRoutes);
app.use('/api/mercado', mercadoRoutes); 
app.use('/api/auth', authRoutes);
app.use('/api/carteira', carteiraRoutes);
app.use('/api/ordens', ordemRoutes);

// Configuração da Porta (Usa a do .env ou assume a 3000 por padrão)
const PORTA = process.env.PORT;

// Conexão com o MongoDB usando a sua variável MONGO_URL
const connectDB = async () => mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log(' Banco de dados MongoDB conectado com sucesso!');
        
        // O servidor só começa a rodar depois que o banco de dados estiver conectado
        app.listen(PORTA, () => {
            console.log(`OK. Servidor rodando na porta ${PORTA}`);
        });
    })
    .catch((erro) => {
        console.error(' Erro crítico ao conectar no MongoDB:', erro);
    });

connectDB();    