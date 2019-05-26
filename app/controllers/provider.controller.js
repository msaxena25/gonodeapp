const Provider = require('../models/provider.model');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    Provider.find((error, data) => {
        if (error) {
            res.status(500);
            res.json(error);
            return next(error);
        }
        res.status(200);
        res.json({
            response: data
        });
    });

};

exports.provider_create = function (req, res, next) {
    console.log(req.body);
    let p = new Provider({
        name: req.body.name,
        mobileNo: req.body.mobileNo,
        password: req.body.password,
        city: req.body.city,
        state: req.body.state,
        country: req.body.country,
        services: req.body.services
    })

    p.save((error) => {
        if (error) {
            res.status(500);
            res.json(error);
            return next(error);
        }
        res.status(201);
        res.json({
            response: p,
            message: 'Provider added successfully'
        });

    });
}

exports.provider_detail = (req, res, next) => {
    Provider.findById(req.params.id, (error, data) => {
        if (error) {
            res.status(500);
            res.json(error);
            return next(error);
        }
        res.status(200);
        res.json({
            response: data
        });
    })
}

exports.provider_update = (req, res, next) => {
    // Provider.services.push(req.body.services);
    console.log(req.body);
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
                response: data
            });
        }
    });
}

exports.provider_addServices = function (req, res, next) {
    Provider.findById(req.params.id, (error, provider) => {
        if (error) {
            res.status(500);
            res.json(error);
            return next(error);
        } else {
            let arr_services = JSON.parse(req.body.services);
            arr_services.forEach(element => {
                if (element.id) {
                    let doc = provider.services.id(element.id);
                    if (doc && !doc.isNew) {
                        console.log(doc);
                        doc.service = element.service;
                        doc.price = element.price;

                    }
                } else {
                    provider.services.push(element);
                }
            });
            provider.save((error) => {
                if (error) {
                    res.status(500);
                    res.json(error);
                } else {
                    res.status(200);
                    res.json({
                        response: provider
                    });
                }
            });

        }

    })
}

exports.provider_delete = (req, res, next) => {
    Provider.findByIdAndRemove(req.params.id, (error) => {
        if (error) {
            res.status(500);
            res.json(error);
        } else {
            res.status(200);
            res.json({
                response: {
                    message: 'Deleted successfully'
                }
            });
        }
    })
}