const express = require('express');
const port = 3000;
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const providerRoute = require('./app/routes/provider.route');
const userRoute = require('./app/routes/user.route');

const tokenGenerater = require('./app/auth/token-generater');
const middleware = require('./app/auth/middleware');
const logger = require('morgan');

let dev_db_url = 'mongodb+srv://admin:bbFCj2XeUf1zD2fG@godb-tsqac.mongodb.net/gomandb?retryWrites=true';
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

app.listen(port, () => console.log(`app listening on port ${port}!`));