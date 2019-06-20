const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const providerRoute = require('./app/routes/provider.route');
const userRoute = require('./app/routes/user.route');

const tokenGenerater = require('./app/auth/token-generater');
const middleware = require('./app/auth/middleware'); // currently below used code is commented
const logger = require('morgan');
const fireBaseRoute = require('./app/routes/firebase.route');
const config = require('./app/config/config');


let dev_db_url = config.mongoDBURL;
let mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB, {
    useNewUrlParser: true
}, (response) => {
    console.log(response);
});
//mongoose.Promise = global.Promise;

let db = mongoose.connection;
db.on('error', (err) => {
    console.error('Mongo DB connection failed', err)
});

db.once('open', function () {
    console.log("Connection Successful!");
});

app.use('/static', express.static('assets'));

app.use(logger('dev'));  // Creating a logger (using morgan)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));



app.use('/providers', providerRoute);
//app.use('/providers', middleware.verifyToken , providerRoute);

app.use('/users', userRoute);

app.post('/auth', tokenGenerater.generateToken);

app.use('/firebase', fireBaseRoute);

//app.use('/cloudFileUpload', cloudStorageCtrl);

app.listen(config.port, () => console.log(`app listening on port ${config.port}!`));