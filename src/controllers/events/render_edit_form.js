const Request = require('request');
const { eventsURL } = require('../../constants/urls.json');

module.exports = (req, res) => {
  Request(`${eventsURL}/${req.params.id}`, (error, response, body) => {
    if (error) {
      return res.render('error', {
        statusCode: 500,
        errorMessage: res.local.localText.serverError
      });
    }
    if (response.statusCode !== 200) {
      res.render('error', {
        statusCode: 400,
        errorMessage: res.locals.localText.badRequest
      });
    }
    const event = JSON.parse(body);
    const defaultLang = req.params.lang;
    const alternativeLang = (defaultLang === 'en') ? 'ar' : 'en';

    if (event.startTime) event.startTime = event.startTime.slice(0, -8);
    if (event.endTime) event.endTime = event.endTime.slice(0, -8);

    event.local = event[defaultLang];
    if (event.place) {
      if (event.place[defaultLang]) {
        event.place.local = event.place[defaultLang];
      } else {
        event.place.local = event.place[alternativeLang];
      }
    }
    res.render('event-form', {
      event,
      edit: true
    });
  });
};
