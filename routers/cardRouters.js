const express = require('express');
const router = express.Router();
const cardController = require('../controllers/cardController');
const authenticateToken = require('../middleware/jwt');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configuração temporária do multer (arquivos serão apagados após upload no Cloudinary)
const upload = multer({ dest: 'uploads/' });

router.get('/', cardController.getCards);
router.post('/', authenticateToken, upload.single('image'), cardController.createCard);  // Cria card com imagem
router.put('/:id', authenticateToken, upload.single('image'), cardController.updateCard);  // Atualiza card com imagem
router.delete('/:id', authenticateToken, cardController.deleteCard);

module.exports = router;
