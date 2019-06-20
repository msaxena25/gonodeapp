const express = require("express");
const router = express.Router();
const Multer = require("multer");
const admin = require("firebase-admin");
const config = require("../config/config");

const fcmCtrl = require("../controllers/fcm.controller");
const cloudStorageCtrl = require("../controllers/cloud-storage.controller");

const serviceAccount = require(config.fireBasePrivateKeyPath); //path/to/serviceAccountKey.json

// Help LINK: https://www.techotopia.com/index.php/Sending_Firebase_Cloud_Messages_from_a_Node.js_Server

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: config.firebaseDataBaseURL,
  storageBucket: config.firebaseStorageBucketURL
});

var bucket = admin.storage().bucket();

// add admin to ther request params to get into controller zone
router.use(function(req, res, next) {
  if (!req.admin) {
    req.admin = admin;
  }
  if (!req.bucket) {
    req.bucket = bucket;
  }
  next();
});

router.post("/notify", fcmCtrl.sendNotification);

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024 // no larger than 5mb, you can change as needed.
  }
});


router.post("/upload", multer.single("file"), cloudStorageCtrl.upload);

module.exports = router;
