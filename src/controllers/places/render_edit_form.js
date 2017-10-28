const Request = require('request');
const { placesURL } = require('../../constants/urls.json');

module.exports = (req, res) => {
  Request(`${placesURL}/${req.params.id}`, (error, response, body) => {
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

    const place = JSON.parse(body);
    place.local = place[req.params.lang];
    res.render('place-form', {
      place,
      edit: true
    });
  });
};
