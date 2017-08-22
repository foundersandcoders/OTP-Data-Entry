const express = require('express');
const router = require('./controllers/router.js');
const hbs = require('express-handlebars');
const languages = require('./text.js');

const app = express();

app.locals.text = languages.english;
app.locals.lang = 'en';

app.engine('hbs', hbs({
  defaultLayout: 'main',
  extname: 'hbs'
}));

app.set('view engine', 'hbs');
app.set('port', process.env.PORT || 3000);

app.use(express.static('public'));
app.use(router);

module.exports = app;
