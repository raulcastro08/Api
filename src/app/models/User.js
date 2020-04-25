const mongoose = require('../../database');
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({

    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
    },

    password: {
        type: String,
        required: true,
        select: false, //quando os valores do usuário forem requeridos (select) pelo bando de dados o conteudo não será retornado

    },

    createdAt: {
        type: Date,
        default: Date.now,
    }
});

UserSchema.pre('save', async function (next) { // antes de salvar vai ser criando um hash para o password do user
    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash

    next()
})

const User = mongoose.model('User', UserSchema);

module.exports = User;

