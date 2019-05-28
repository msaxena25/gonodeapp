const express = require('express');
const providerCtrl = require('../controllers/provider.controller');
const router = express.Router();
const fileUploadCtrl = require('../controllers/file-upload.controller');

router.get('/', providerCtrl.provider_findAll);

router.post('/avatar/:id', fileUploadCtrl.fileUpload);

router.get('/:id', providerCtrl.provider_detail);

router.post('/create', providerCtrl.provider_create);

router.put('/update/:id', providerCtrl.provider_update);

router.put('/services/:id', providerCtrl.provider_addServices);

router.put('/areas/:id', providerCtrl.provider_addAreas);

router.put('/feedback/:id', providerCtrl.provider_feedback);

router.put('/updateSchema', providerCtrl.provider_schema_update);

router.delete('/:id', providerCtrl.provider_delete);

module.exports = router;