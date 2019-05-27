let jwt = require('jsonwebtoken');
let config = require('../config/config');

let generateToken = (req, res, next) => {
    let username = req.body.username;
    let password = req.body.password;
    // For the given username fetch user from DB
    let mockedUsername = 'admin';
    let mockedPassword = 'password';

    if (username && password) {
        if (username === mockedUsername && password === mockedPassword) {
            const token = jwt.sign({
                username: username
            }, config.secret, {
                expiresIn: '24h'
            });

            res.status(200);
            res.json({
                success:true,
                token: token,
                message: 'Authentication successful!'
            })
        } else {
            res.status(403);
            res.json({
                success: false,
                message: 'Incorrect username or password'
            });
        }
    } else {
        res.status(400);
        res.json({
            success: false,
            message: 'Authentication failed! Please check the request'
        });
    }



}

exports.generateToken = generateToken;