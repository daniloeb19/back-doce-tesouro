const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Registrar um novo usuário
const signup = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'O email já está em uso.' });
        }

        const newUser = new User({ email, password });
        await newUser.save();
        res.status(201).json({ message: 'Usuário criado com sucesso!' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Fazer login
const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Credenciais inválidas.' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Credenciais inválidas.' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ message: 'Login realizado com sucesso!', token }).status(200);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    // Validação básica
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    try {
        // Verificar se o e-mail já está registrado
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'E-mail já está em uso.' });
        }

        // Criar o novo usuário
        const newUser = new User({ username, email, password });
        await newUser.save();

        res.status(201).json({ message: 'Usuário registrado com sucesso.', userId: newUser._id });
    } catch (err) {
        res.status(500).json({ message: 'Erro ao registrar usuário.', error: err.message });
    }
};

module.exports = { signup, login, registerUser };
