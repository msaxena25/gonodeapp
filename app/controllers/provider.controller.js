const Provider = require('../models/provider.model');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};

exports.provider_create = function (req, res, next) {
    let p = new Provider({
        name: req.body.name,
        mobileNo: req.body.mobileNo
    })

    p.save((error) => {
        if (error) {
            res.status(500);
            res.json(error);
            return next(error);
        }
        res.status(201);
        res.json({
            respose: p,
            message: 'Provider added successfully'
        });

    });
}

exports.getProviderDetail = (req, res, next) => {
    Provider.findById(req.params.id, (error, data) => {
        if (error) {
            res.status(500);
            res.json(error);
            return next(error);
        }
        res.status(201);
        res.json({
            respose: data
        });
    })
}

exports.updateProvider = (req, res, next) => {
    Provider.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            res.status(500);
            res.json(error);
            return next(error);
        } else {
            res.status(201);
            res.json({
                message: 'Record updated',
                respose: data
            });
        }
    });
}