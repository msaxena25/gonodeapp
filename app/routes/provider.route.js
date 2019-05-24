const express = require('express');
const providerCtrl = require('../controllers/provider.controller');
const router = express.Router();



router.get('/', providerCtrl.test);

router.get('/:id', providerCtrl.getProviderDetail);

router.post('/create', providerCtrl.provider_create);

router.put('update/:id', providerCtrl.updateProvider);

module.exports = router;