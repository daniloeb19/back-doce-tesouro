const express = require('express');
const router = express.Router();
const { signup, login, registerUser } = require('../controllers/authController');

router.post('/signup', signup);
router.post('/login', login);
router.post('/register', registerUser);

module.exports = router;
