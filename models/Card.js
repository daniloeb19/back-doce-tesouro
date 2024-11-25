const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    longDescription: { type: String },
    price: { type: Number, required: true },
    image: { type: String, required: true }, // URL da imagem
}, { timestamps: true });

module.exports = mongoose.model('Card', cardSchema);
