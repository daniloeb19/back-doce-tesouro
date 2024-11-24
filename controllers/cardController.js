const Card = require('../models/Card');
const path = require('path');

// Função para criar um novo card
const createCard = async (req, res) => {
    const imagePath = req.file ? path.join('uploads', req.file.filename) : null;  // Caminho da imagem no servidor

    // Verifique se a imagem foi realmente enviada
    if (!imagePath) {
        return res.status(400).json({ message: "Imagem é obrigatória" });
    }

    const newCard = new Card({
        ...req.body,
        image: imagePath,  // Salva o caminho da imagem
    });

    try {
        const savedCard = await newCard.save();
        res.status(201).json(savedCard);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Função para atualizar um card existente
const updateCard = async (req, res) => {
    const { title, description, longDescription, price } = req.body;
    const imagePath = req.file ? path.join('uploads', req.file.filename) : null;

    try {
        const updatedCard = await Card.findByIdAndUpdate(
            req.params.id,
            {
                title,
                description,
                longDescription,
                price,
                image: imagePath,  // Atualiza o caminho da imagem
            },
            { new: true }
        );
        res.json(updatedCard);  // Retorna o card atualizado
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Função para deletar um card
const deleteCard = async (req, res) => {
    try {
        const card = await Card.findById(req.params.id);

        if (!card) {
            return res.status(404).json({ message: 'Card não encontrado' });
        }

        await Card.deleteOne({ _id: req.params.id });
        res.json({ message: 'Card deletado com sucesso' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Função para obter todos os cards
const getCards = async (req, res) => {
    try {
        const cards = await Card.find();
        res.json(cards);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

module.exports = { getCards, createCard, updateCard, deleteCard };
