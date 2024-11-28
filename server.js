const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const cardRoutes = require('./routers/cardRouters');
const authRoutes = require('./routers/userRoutes');
dotenv.config();
const path = require('path');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Conexão com o MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Conectado ao MongoDB'))
    .catch((err) => console.error('Erro ao conectar ao MongoDB:', err));

// Rotas
app.use('/api/cards', cardRoutes);
app.use('/auth', authRoutes);
app.get('/', (req, res) => {
    res.json({ message: 'Hello from Express!' }).status(200);
});

// Iniciando o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
