var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    bodyParser = require('body-parser'),
    controller = require('./controller/controller');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var customerRoute = require('./router/router-customer');
var accountRoute = require('./router/router-account');
customerRoute(app);
accountRoute(app);

app.listen(port);
console.log('Learn Node JS With Kiddy, RESTful API server started on: ' + port);