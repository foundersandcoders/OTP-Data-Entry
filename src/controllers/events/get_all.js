const Request = require('request');
const {eventsURL} = require('../../constants/urls.json');

module.exports = (req, res) => {
  Request(eventsURL, (error, response, body) => {
    if (error) {
      res.render('error');
    }
    if (response.statusCode !== 200) {
      res.render('error');
    }

    const data = JSON.parse(body).filter((event) => {
      return event.hasOwnProperty(req.params.lang);
    });

    data.forEach((event) => {
      event.local = event[req.params.lang];
    });

    res.render('events', {
      events: data
    });
  });
};
