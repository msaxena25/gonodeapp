const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user.controller');

// a middleware function with no mount path. This code is executed for every request to the router
router.use(function (req, res, next) {
    console.log('Time:', Date.now())
    next();
  })

router.get('/', userCtrl.user_findAll);

router.post('/create', userCtrl.user_create);

router.delete('/:id', userCtrl.user_delete);

router.get('/:id', userCtrl.user_detail);

module.exports = router;