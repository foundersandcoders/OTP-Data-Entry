const express = require('express');
const router = require('./controllers/router.js');
const hbs = require('express-handlebars');

const app = express();

app.engine('hbs', hbs({
  defaultLayout: 'main',
  extname: 'hbs'
}));

app.set('view engine', 'hbs');
app.set('port', process.env.PORT || 3000);

app.use(express.static('public'));
app.use(router);

module.exports = app;
