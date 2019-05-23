const express = require('express');
const port = 3000;
const app = express();
const bodyParser = require('body-parser');

const providerRoute = require('./app/routes/provider.route');

app.use('/providers', providerRoute);

//app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));