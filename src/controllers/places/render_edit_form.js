const Request = require('request');
const { placesURL } = require('../../constants/urls.json');

module.exports = (req, res) => {
  Request(`${placesURL}/${req.params.id}`, (error, response, body) => {
    if (error) return res.status(404).send(error);

    const place = JSON.parse(body);
    place.local = place[req.params.lang];
    res.render('place-form', {
      place,
      edit: true
    });
  });
};
