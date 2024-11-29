const Card = require('../models/Card');
const cloudinary = require('../config/cloudinary');

const createCard = async (req, res) => {
    let imagePath = null;
    console.log(JSON.stringify(req.body))
    // Verifique se a imagem foi enviada e faça o upload para o Cloudinary
    if (req.body.image) {
        try {
            // O arquivo de imagem é enviado como base64 ou URL pelo cliente
            const result = await cloudinary.uploader.upload(req.body.image, {
                folder: 'cards',
            });
            imagePath = result.secure_url; // URL segura da imagem na nuvem
        } catch (err) {
            return res.status(500).json({ message: 'Erro ao fazer upload da imagem.' });
        }
    } else {
        return res.status(400).json({ message: "Imagem é obrigatória" });
    }

    const newCard = new Card({
        ...req.body,
        image: imagePath,  // Salva o URL da imagem no banco
    });

    try {
        const savedCard = await newCard.save();
        res.status(201).json(savedCard);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};


const updateCard = async (req, res) => {
    const { title, description, longDescription, price } = req.body;
    let imagePath = null;

    // Verifique se uma nova imagem foi enviada
    if (req.body.image) {
        try {
            // O arquivo de imagem é enviado como base64 ou URL pelo cliente
            const result = await cloudinary.uploader.upload(req.body.image, {
                folder: 'cards',
            });
            imagePath = result.secure_url; // URL da nova imagem
        } catch (err) {
            return res.status(500).json({ message: 'Erro ao fazer upload da imagem.' });
        }
    }

    try {
        const updatedCard = await Card.findByIdAndUpdate(
            req.params.id,
            {
                title,
                description,
                longDescription,
                price,
                ...(imagePath && { image: imagePath }), // Atualiza a imagem apenas se houver nova
            },
            { new: true }
        );
        res.json(updatedCard);
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
