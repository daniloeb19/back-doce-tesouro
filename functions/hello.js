const serverless = require('serverless-http');
const express = require('express');
const app = express();

// Definindo uma rota simples
app.get('/', (req, res) => {
    res.json({ message: "Olá, mundo!" });
});

// Exportando a função Lambda
module.exports.handler = serverless(app);
