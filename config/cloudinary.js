const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');
dotenv.config();
// Configuração do Cloudinary
cloudinary.config({
    cloud_name: process.env.cloud_name, // Substitua pelo seu Cloud Name
    api_key: process.env.api_key,       // Substitua pela sua API Key
    api_secret: process.env.api_secret, // Substitua pela sua API Secret
});

module.exports = cloudinary;
