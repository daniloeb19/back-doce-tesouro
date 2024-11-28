const express = require('express');
const router = express.Router();
const cardController = require('../controllers/cardController');
const authenticateToken = require('../middleware/jwt');

router.get('/', cardController.getCards);
router.post('/', authenticateToken, cardController.createCard);  // Cria card com imagem
router.put('/:id', authenticateToken, cardController.updateCard);  // Atualiza card com imagem
router.delete('/:id', authenticateToken, cardController.deleteCard);

module.exports = router;
