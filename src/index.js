require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes/routes.js');
const mongoose = require('mongoose');
const app = express();
const multer = require('multer')
const aws = require('aws-sdk')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer().any())

mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true
})
    .then(() => console.log("MongoDb is connected"))
    .catch(err => console.log(err))

aws.config.update({
    accessKeyId: process.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    region: process.env.REGION
})

app.use('/', route);

app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});