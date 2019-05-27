const express = require('express');
const providerCtrl = require('../controllers/provider.controller');
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './assets/avatar');
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname);
    },


});

let fileFilter = function (req, file, cb) {
    var allowedMimes = ['image/jpeg', 'image/pjpeg', 'image/png'];
    console.log(file.mimetype);
    if (allowedMimes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb({
            success: false,
            message: 'Invalid file type. Only jpg, png image files are allowed.'
        }, false);
    }
};


let obj = {
    storage: storage,
    limits: {
        fileSize: 200 * 1024

    },
    fileFilter: fileFilter
};

const upload = multer(obj).single('file'); // upload.single('file')

router.get('/', providerCtrl.test);

router.post('/avatar/:id', function (req, res, next) {

    upload(req, res, function (error) {
        if (error) { //instanceof multer.MulterError
            res.status(500);
            if(error.code == 'LIMIT_FILE_SIZE') {
                error.message = 'File Size is too large. Allowed fil size is 200KB';
                error.success = false;
            }
           return res.json(error);
        } else {
            if (!req.file) {
                res.status(500);
                res.json('file not found');
            }
            res.status(200);
            res.json({
                success: true,
                message: 'File uploaded successfully!'
            });
        }
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