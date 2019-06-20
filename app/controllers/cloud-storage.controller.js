
exports.upload = (req, res) => {
  req.bucket.upload("assets/avatar/5ce7f5c25958b012805bb4f3_Logo-100-1.jpg").then(
    result => {
      res.status(200);
      res.json(result);
    },
    error => {
     res.status(500);
     res.json(error);
    }
  );
};

// /* // Controller to upload file into google cloud storage

// const Multer = require("multer");
// const { Storage } = require("@google-cloud/storage");
// const config = require("../config/config");
// const express = require("express");
// const router = express.Router();

// // Creates a client
// const storage = new Storage();

// // const storage = storage1({
// //   projectId: "goman-cb962",
// //   keyFilename: config.fireBasePrivateKeyPath
// // });
// const bucket = storage.bucket(config.fireBasePrivateKeyPath);
// async function createBucket() {
//   // Creates the new bucket
//   await storage.createBucket(bucket);
//   console.log(`Bucket ${bucket} created.`);
// }

// createBucket();

// const multer = Multer({
//   storage: Multer.memoryStorage(),
//   limits: {
//     fileSize: 5 * 1024 * 1024 // no larger than 5mb, you can change as needed.
//   }
// });

// /**
//  * Upload the image file to Google Storage
//  * @param {File} file object that will be uploaded to Google Storage
//  */
// const uploadImageToStorage = file => {
//   return new Promise((resolve, reject) => {
//     if (!file) {
//       reject("No image file");
//     }
//     let newFileName = `${file.originalname}_${Date.now()}`;
//     console.log(newFileName);

//     let fileUpload = bucket.file(newFileName);

//     const blobStream = fileUpload.createWriteStream({
//       metadata: {
//         contentType: file.mimetype
//       }
//     });

//     blobStream.on("error", error => {
//       reject("Something is wrong! Unable to upload at the moment." + error);
//     });

//     blobStream.on("finish", () => {
//       // The public URL can be used to directly access the file via HTTP.
//       const url = format(
//         `https://storage.googleapis.com/${bucket.name}/${fileUpload.name}`
//       );
//       resolve(url);
//     });

//     blobStream.end(file.buffer);
//   });
// };

// uploadCallback = (req, res) => {
//   console.log("Upload Image");

//     let file = req.file;
//   if (file) {
//     uploadImageToStorage(file)
//       .then(success => {
//         res.status(200).send({
//           status: "success"
//         });
//       })
//       .catch(error => {
//         console.error(error);
//       });
//   }
// };
// router.post("/", multer.single("file"), uploadCallback);
// module.exports = router;
//  */
