const admin = require("firebase-admin");
const config = require("../config/config");

const serviceAccount = require(config.fireBasePrivateKeyPath); //path/to/serviceAccountKey.json

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: config.firebaseDataBaseURL
});

// for now this is fixed device Id : we can fetch this one from request body
let registrationToken =
  "eaGj-Jj3h5w:APA91bGqGJV4aTJqxd4bIYVKjLBYkhEpFKCthwFNTvskJFyL75ZtF6Tonmm3PM4qxOkJ4iqo1-z5luLBhXthBUe3o1D1k_3XdOKhE4ATFNeUh1StAMIXHcA6_iihnnhU6KzbC-Mi-8hD";

exports.sendNotification = (req, res) => {
  let payload = {
    notification: {
      title: req.body.title || "This is a Notification",
      body: req.body.message || "This is the body of the notification message."
    }
  };

  let options = {
    priority: "high",
    timeToLive: 60 * 60 * 24
  };
  admin
    .messaging()
    .sendToDevice(registrationToken, payload, options)
    .then(function(response) {
      console.log("Successfully sent message:", response);
      res.status(200);
      res.json(response);
    })
    .catch(function(error) {
      console.log("Error sending message:", error);
      res.status(500);
      res.json(error);
    });
};
