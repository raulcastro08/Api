const express = require('express');

const User = require('../models/User');

const router = express.Router();

router.post('/register', async (req, res) => {
    const { email } = req.body
    try {
        if (await User.findOne({ email })) //verifica se o email inserido ja existe
            return res.status(400).send({ error: 'User already exists' }) //retorna erro

        const user = await User.create(req.body);

        user.password = undefined

        return res.send({ user });
    } catch (err) {
        return res.status(400).send({ error: 'Registration Falied' })
    }
});

module.exports = app => app.use('/alth', router); //repassado o router para o app com o prefixo "auth"
