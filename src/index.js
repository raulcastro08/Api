const express = require('express')
const app = express()

app.use(express.json());

require('./app/controllers/index.js')(app);

app.listen(3000)