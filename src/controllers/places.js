const Request = require('request');

const placeController = {};

placeController.getAll = (req, res) => {
  const placesURL = 'https://nazareth-open-tourism-platform.herokuapp.com/places';
  Request(placesURL, (error, response, body) => {
    if (error) return res.status(404).send(error);
    const data = JSON.parse(body);
    res.render('places', {output: data});
  });
};

module.exports = placeController;
