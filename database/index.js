const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/noderest', { useNewUrlParser: true, useUnifiedTopology: true, 'useCreateIndex': true }) //conectei ao banco de dados com nome de noderest

mongoose.Promise = global.Promise; //classe de promisse que vai ser usada no banco de dados

module.exports = mongoose;

