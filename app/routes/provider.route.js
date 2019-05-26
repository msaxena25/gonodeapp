const express = require('express');
const providerCtrl = require('../controllers/provider.controller');
const router = express.Router();



router.get('/', providerCtrl.test);

router.get('/:id', providerCtrl.provider_detail);

router.post('/create', providerCtrl.provider_create);

router.put('/update/:id', providerCtrl.provider_update);

router.put('/addservices/:id', providerCtrl.provider_addServices);

router.delete('/:id', providerCtrl.provider_delete);

module.exports = router;