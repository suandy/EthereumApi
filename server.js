// Dependencies
var express = require('express');
var bodyParser = require('body-parser');

// Constant
const PORT = 4000;
const HOST = '0.0.0.0';

// Express
var app = express();
app.use(bodyParser.urlencoded({ extended : true }));
app.use(bodyParser.json());

// Routes
app.use('/', require('./routes/app'));

// Start server
app.listen(PORT, HOST);
console.log('API is working on port ' + PORT);