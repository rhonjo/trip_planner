// require express so that we can build an express app

var express = require('express');
var mongoose = require("mongoose");
var path = require('path');
// instantiate the app
var app = express();
var bodyParser = require("body-parser")
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
// set up a static file server that points to the "client" directory
app.use(express.static(path.join(__dirname, './client/static')));


require('./config/mongoose.js');
require('./config/routes.js')(app);

app.listen(8001, function() {
  console.log('Over 8000!');
})


