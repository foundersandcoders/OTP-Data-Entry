const express = require('express');
const router = require('./controllers/router.js');
const hbs = require('express-handlebars');
const languages = require('./text.js');
const getMapLink = require('../views/helpers/getMapLink.js');
const bodyParser = require('body-parser');

const app = express();

app.locals.en = languages.en;
app.locals.ar = languages.ar;

app.engine('hbs', hbs({
  defaultLayout: 'main',
  extname: 'hbs',
  helpers: {
    getMapLink
  }
}));

app.set('view engine', 'hbs');
app.set('port', process.env.PORT || 4000);

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(router);

module.exports = app;
