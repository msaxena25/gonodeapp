const User = require('../models/user.model');

exports.user_findAll = (req, res) => {
    User.find((error, data) => {
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
}

exports.user_create = function (req, res, next) {
    const body = req.body;
    let user = new User({
        name: body.name,
        mobileNo: body.mobileNo,
        password: body.password,
        address: body.address,
        city: body.city,
        state: body.state,
        country: body.country
    })

    user.save((error) => {
        if (error) {
            res.status(500);
            res.json(error);
            return next(error);
        }
        res.status(201);
        res.json({
            response: user,
            message: 'User added successfully'
        });

    });
}

exports.user_detail = (req, res, next) => {
    User.findById(req.params.id, (error, data) => {
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


exports.user_delete = (req, res, next) => {
    User.findByIdAndRemove(req.params.id, (error) => {
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

/**
 * propName:mobileNo
   updatedPropName:mobileNumber
 */
exports.user_schema_update = (req, res) => {
    User.update({}, {
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