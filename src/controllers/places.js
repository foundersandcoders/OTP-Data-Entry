const Request = require('request');

const placeController = {};

placeController.getAll = (req, res) => {
  const placesURL = 'https://nazareth-open-tourism-platform.herokuapp.com/places';
  Request(placesURL, (error, response, body) => {
    if (error) return console.log(error);
    res.end(body);
  });
};

module.exports = placeController;
