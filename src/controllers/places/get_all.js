const Request = require('request');
const { placesURL } = require('../../constants/urls.json');

module.exports = (req, res) => {
  Request(placesURL, (error, response, body) => {
    if (error) return res.status(404).send(error);

    const data = JSON.parse(body).filter((place) => {
      return place.hasOwnProperty(req.params.lang);
    });

    data.forEach((place) => {
      place.local = place[req.params.lang];
    });

    // USE FOR NOW, LESS UGLY
    const topPlaces = data.slice(0, 4);

    res.render('places', {
      places: topPlaces
      // places: data
    });
  });
};
