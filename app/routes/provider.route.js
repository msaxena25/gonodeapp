const express = require('express');
const router = express.Router();

const providerCtrl = require('../controllers/provider.controller');

router.get('/', providerCtrl.test);

module.exports = router;