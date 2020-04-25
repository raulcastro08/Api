// import Express from 'express'
// import BodyParser from 'body-parser'
// import bodyParser from 'body-parser'
const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('./app/controllers/index.js')(app);


app.listen(3000)

