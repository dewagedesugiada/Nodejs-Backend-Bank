var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    bodyParser = require('body-parser'),
    controller = require('./controller/controller');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

var morgan = require('morgan');

var logger = require("./winston");
app.use(morgan('combined',{ "stream": logger.stream }));
logger.debug("Overriding 'Express' logger");


var customerRoute = require('./router/router-customer');
var accountRoute = require('./router/router-account');
var transactionRoute = require('./router/router-transaction');
customerRoute(app);
accountRoute(app);
transactionRoute(app);

app.listen(port);
// console.log('Learn Node JS With Kiddy, RESTful API server started on: ' + port);

logger.info('Learn Node JS With Kiddy, RESTful API server started on: ' + port);