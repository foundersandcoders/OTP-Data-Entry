const Request = require('request');
const { eventsURL } = require('../../constants/urls.json');

module.exports = (req, res) => {
  Request(`${eventsURL}/${req.params.id}`, (error, response, body) => {
    if (error) {
      return res.render('error', {
        statusCode: 500,
        errorMessage: res.locals.localText.serverError
      });
    }
    if (response.statusCode !== 200) {
      return res.render('error', {
        statusCode: 400,
        errorMessage: res.locals.localText.badRequest
      });
    }

    const event = JSON.parse(body);
    const defaultLang = req.params.lang;
    const alternativeLang = (defaultLang === 'en') ? 'ar' : 'en';

    event.local = event[defaultLang];
    if (event.place) {
      if (event.place[defaultLang]) {
        event.place.local = event.place[defaultLang];
      } else {
        event.place.local = event.place[alternativeLang];
      }
    }
    res.render('event', {
      event
    });
  });
};
