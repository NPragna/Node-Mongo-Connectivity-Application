require('dotenv').config();
let mongoose = require('mongoose');
var logger = require('logger').createLogger(process.env.LOG_FILE_PATH); // logs to a file
const GetDataController = require('./controllers/get-data-controller');
const bodyParser = require('body-parser');
if (process.env.NODE_ENV == "prod") {
    // can include some production related configurations
    // newrelic setup
}

async function create() {
   
    await mongoose.connect(process.env.MONGODB, {useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
        keepAlive: 1});


    logger.info('Successfully Connected to Mongo server');
    const express = require('express');
    const app = express();
    var jsonParser = bodyParser.json()

    app.get('/totalOrder/:order_id?', jsonParser, GetDataController.totalOrder);

    app.listen(process.env.PORT);
    logger.info('started with PORT ::'+process.env.PORT);
}

try {
    create();   
} catch(e) {
    logger.error('Error while strating application'+ JSON.stringify(e));
}