const jwt = require('jsonwebtoken');
const config = require('../config/config');

const verifyToken = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase

    if (token) {

        jwt.verify(token, config.secret, (err, decoded) => {
            if (err) {
                res.status(500);
                res.json({
                    success: false,
                    message: 'Token is not valid'
                });
            } else {
                req.decoded = decoded;
                next();
            }
        })
    } else {
        res.status(500);
        return res.json({
            success: false,
            message: 'Auth token is not supplied'
        });
    }


}

exports.verifyToken = verifyToken;