const Request = require('request');
const { placesURL } = require('../../constants/urls.json');

module.exports = (req, res) => {
  Request(placesURL, (error, response, body) => {
    if (error) {
      res.status(400).send(error);
    }
    if (response.statusCode !== 200) {
      res.render('error');
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
