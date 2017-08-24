const Request = require('request');

const { placesURL } = require('../constants/urls.json');

const placeController = {};

placeController.getAll = (req, res) => {
  if (req.params.lang !== 'en' || req.params.lang !== 'ar') {
    return res.status(404).send('Page does not exist');
  }

  Request(placesURL, (error, response, body) => {
    if (error) return res.status(404).send(error);

    const data = JSON.parse(body).filter((place) => {
      return place.hasOwnProperty(req.params.lang);
    });

    res.render('places', {
      output: data,
      localLang: req.app.locals[req.params.lang]
    });
  });
};

module.exports = placeController;
