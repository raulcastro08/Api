const express = require('express')
const althmiddleware = require('../middleware/auth')

const router = express.Router();

router.use(althmiddleware);
router.get('/', (req, res) => {
    res.send({ ok: true, user: req.userId });
});

module.exports = app => app.use('/projects', router);