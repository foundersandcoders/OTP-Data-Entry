const Request = require('request');
const {eventsURL} = require('../../constants/urls.json');

module.exports = (req, res) => {
  Request(eventsURL, (error, response, body) => {
    if (error) {
      return res.render('error');
    }
    if (response.statusCode !== 200) {
      return res.render('error');
    }

    const data = JSON.parse(body).filter((event) => {
      return event.hasOwnProperty(req.params.lang);
    });

    const defaultLang = req.params.lang;
    const alternativeLang = (defaultLang === 'en') ? 'ar' : 'en';

    data.forEach((event) => {
      event.local = event[defaultLang];
      if (event.place) {
        if (event.place[defaultLang]) {
          event.place.local = event.place[defaultLang];
        } else {
          event.place.local = event.place[alternativeLang];
        }
      }
    });

    res.render('events', {
      events: data
    });
  });
};
