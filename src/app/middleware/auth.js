const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth.json');

module.exports = (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (!authHeader)
        return res.status(401).send({ error: "No token Provided" });  //erro 401 é o erro de autorização



    const parts = authHeader.split(' ');

    if (!parts.legth === 2)
        return res.status(401).send({ error: " Token Error" });

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme))
        return res.status(401).send({ error: "Token Mal Formated" })

    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if (err) return res.status(401).send({ error: "Tokien Invalid" });

        req.userId = decoded.id;
        return next()


    });

}