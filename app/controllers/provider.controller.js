const Provider = require('../models/provider.model');

 
exports.provider_findAll = function (req, res, next) {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || Number.MAX_SAFE_INTEGER;

    let options = {
        // select: 'name mobileNumber', 
        //  populate: 'author',
        lean: true,
        page: page,
        //offset: 20,
        limit: limit
    };
    // Find data with paginate options
    Provider.paginate({}, options).then((result, error) => {
        if (error) {
            res.status(500);
            res.json(error);
            return next(error);
        }
        res.status(200);
        res.json(result);
    })

    /* // Model find without any options
     Provider.find(query, (error, data) => {
        if (error) {
            res.status(500);
            res.json(error);
            return next(error);
        }
        res.status(200);
        res.json({
            response: data
        });
    }); */


    /* // Use of find with options and limit
      let query = Provider.find({}, {}, {
         sort: {
             name: 'desc'
         }
     }).select('name').limit(3);
     query.exec((error, data) => {
         if (error) {
             res.status(500);
             res.json(error);
             return next(error);
         }
         res.status(200);
         res.json({
             response: data
         });
     }) */


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
            if (!req.body.services) {
                res.json('body not defined');
                return next('body not defined');
            }
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

exports.provider_addAreas = (req, res, next) => {
    Provider.findById(req.params.id, (error, provider) => {
        if (error) {
            res.status(500);
            res.json(error);
            return next(error);
        } else {
            if (!req.body.areas) {
                res.json('body not defined');
                return next('body not defined');
            }
            let arr_areas = JSON.parse(req.body.areas);
            arr_areas.forEach(element => {
                if (element.id) {
                    let doc = provider.areas.id(element.id);
                    if (doc && !doc.isNew) {
                        console.log(doc);
                        doc.area = element.area;

                    }
                } else {
                    provider.areas.push(element);
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

exports.provider_feedback = function (req, res, next) {
    Provider.findById(req.params.id, (error, provider) => {
        if (error) {
            res.status(500);
            res.json(error);
            return next(error);
        } else {
            if (!req.body.feedback) {
                res.json('body not defined');
                return next('body not defined');
            }
            let arr_feedback = JSON.parse(req.body.feedback);
            arr_feedback.forEach(element => {
                if (element.id) {
                    let doc = provider.feedback.id(element.id);
                    if (doc && !doc.isNew) {
                        console.log(doc);
                        doc.review = element.review;
                        doc.user = element.user;

                    }
                } else {
                    provider.feedback.push(element);
                }
            });
            let rating = 0;
            provider.feedback.forEach(element => {
                if (element.rating) {
                    rating += element.rating;
                }
            });

            provider.totalRating = rating / provider.feedback.length;
            console.log(provider.totalRating);
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
/**
 * propName:mobileNo
   updatedPropName:mobileNumber
 */
exports.provider_schema_update = (req, res) => {
    Provider.update({}, {
        $rename: {
            [req.body.propName]: req.body.updatedPropName
        }
    }, {
        multi: true
    }, function (err, blocks) {
        if (err) {
            res.json(err);
        }
        res.json('done!');
    });
}