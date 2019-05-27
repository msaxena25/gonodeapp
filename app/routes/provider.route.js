const express = require('express');
const providerCtrl = require('../controllers/provider.controller');
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './assets/avatar');
    },
    filename: (req, file, callback) => {
        callback(null, req.params.id + '_' + file.originalname);
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 4 * 1024 * 1024,
    }
})

router.get('/', providerCtrl.test);

router.post('/avatar/:id', upload.single('file'), (req, res, next) => {
    if (!req.file) {
        res.status(500);
        res.json('file error');
    }
    res.status(200);
    res.json({
        success: true,
        message: 'File uploaded successfully!'
    });
});

router.get('/:id', providerCtrl.provider_detail);

router.post('/create', providerCtrl.provider_create);

router.put('/update/:id', providerCtrl.provider_update);

router.put('/services/:id', providerCtrl.provider_addServices);

router.put('/areas/:id', providerCtrl.provider_addAreas);

router.put('/feedback/:id', providerCtrl.provider_feedback);

router.put('/updateSchema', providerCtrl.provider_schema_update);

router.delete('/:id', providerCtrl.provider_delete);

module.exports = router;