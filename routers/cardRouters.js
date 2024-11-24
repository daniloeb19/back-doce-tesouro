const express = require('express');
const router = express.Router();
const cardController = require('../controllers/cardController');
const authenticateToken = require('../middleware/jwt');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const uploadPath = path.join(__dirname, '..', 'uploads');

// Verifica se a pasta existe, caso contrário, cria a pasta
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');  // Pasta onde as imagens serão salvas
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));  // Nome único para cada imagem
    }
});

const upload = multer({ storage: storage });

router.get('/', cardController.getCards);
router.post('/', authenticateToken, upload.single('image'), cardController.createCard);  // Rota para criar card com upload de imagem
router.put('/:id', authenticateToken, upload.single('image'), cardController.updateCard);  // Rota para atualizar card com upload de imagem
router.delete('/:id', authenticateToken, cardController.deleteCard);

module.exports = router;
