const Request = require('request');
const { placesURL } = require('../../constants/urls.json');

module.exports = (req, res) => {
  Request(placesURL, (error, response, body) => {
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

    const data = JSON.parse(body).filter((place) => {
      return place.hasOwnProperty(req.params.lang);
    });

    data.forEach((place) => {
      place.local = place[req.params.lang];
    });

    res.render('places', {
      places: data
    });
  });
};
