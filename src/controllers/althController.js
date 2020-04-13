const express = require('express');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User');
const authConfig = require('../config/auth.json')
const router = express.Router();

router.post('/register', async (req, res) => {
    const { email } = req.body
    try {
        if (await User.findOne({ email })) //verifica se o email inserido ja existe
            return res.status(400).send({ error: 'User already exists' }) //retorna erro

        const user = await User.create(req.body);

        user.password = undefined

        return res.send({
            user,
            token: generateTonken({ id: user.id }),
        });
    } catch (err) {
        return res.status(400).send({ error: 'Registration Falied' })
    }
});


function generateTonken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400, //EXPIRA EM UM DIA, 86400 SEGUNDOS
    })
};

router.post('/authenticate', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if (!user)
        return res.status(400).send({ error: 'User not Found' });


    // if (!await bcrypt.compare(passsword, user.passsword))
    //     return res.status(400).send({ error: 'Invalid Password' })

    const pwd = await bcrypt.compare(password, user.password) // ai filho da puta
    if (pwd == false)
        return res.status(400).send({ error: " Password Invalid " });

    user.password = undefined;


    res.send
        ({
            user,
            token: generateTonken({ id: user.id }),
        })
});

module.exports = app => app.use('/auth', router); //repassado o router para o app com o prefixo "auth"
