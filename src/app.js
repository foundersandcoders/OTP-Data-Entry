var express = require('express');
const router = require('./routes/router.js');
var app = express();

app.use(express.static('public'));
app.use(router);

module.exports = app;
