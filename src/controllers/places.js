const Request = require('request');

const placeController = {};

placeController.getAll = (req, res) => {
  const placesURL = 'https://nazareth-open-tourism-platform.herokuapp.com/places';

  Request(placesURL, (error, response, body) => {
    if (error) return res.status(404).send(error);

    const data = JSON.parse(body).filter((place) => {
      return place.hasOwnProperty(req.app.locals.lang);
    });

    res.render('places', {
      output: data,
      localLang: req.app.locals.text
    });
  });
};

module.exports = placeController;
