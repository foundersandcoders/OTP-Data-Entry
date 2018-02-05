const express = require('express');
const router = require('./controllers/router.js');
const hbs = require('express-handlebars');
const languages = require('./text.js');
const getMapLink = require('./helpers/getMapLink.js');
const bodyParser = require('body-parser');
const langError = require('./middleware/langError.js');
const lang = require('./middleware/setLanguage.js');
const checkOptionsValue = require('./helpers/check_options_value.js');
const checkedDropDown = require('./helpers/check_dropdown_option.js');
const iterate = require('./helpers/iterate.js');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const morgan = require('morgan');

const app = express();

// Middleware
app.use(compression());
app.use(cookieParser());
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  morgan('dev', {
    skip: (req, res) => res.statusCode < 400,
  }),
);

// Set up local languages
app.locals.en = languages.en;
app.locals.ar = languages.ar;

app.engine(
  'hbs',
  hbs({
    defaultLayout: 'main',
    extname: 'hbs',
    helpers: {
      getMapLink,
      checkOptionsValue,
      checkedDropDown,
      formatDate: date => `${new Date(date).toUTCString()}`,
      iterate,
      getDate: date => date.split('T')[0],
      getHours: date => new Date(date).getHours(),
      getMinutes: date => new Date(date).getMinutes(),
    },
  }),
);

app.set('view engine', 'hbs');
app.set('port', process.env.PORT || 4000);

// Custom middlewares
app.use(langError);
app.use(lang);

app.use(router);

module.exports = app;
