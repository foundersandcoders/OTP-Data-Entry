const Request = require('request');
const { placesURL } = require('../../constants/urls.json');

module.exports = (req, res) => {
  Request(`${placesURL}/${req.params.id}`, (error, response, body) => {
    if (error) {
      res.status(400).send(error);
    }
    if (response.statusCode !== 200) {
      return res.status(400).send(error);
    }

    const place = JSON.parse(body);
    place.local = place[req.params.lang];
    res.render('place-form', {
      place,
      edit: true
    });
  });
};
