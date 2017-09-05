const Request = require('request');

const { placesURL } = require('../constants/urls.json');

const placeController = {};

placeController.getAll = (req, res) => {
  if (req.params.lang !== 'en' && req.params.lang !== 'ar') {
    return res.status(404).send('Page does not exist');
  }

  Request(placesURL, (error, response, body) => {
    if (error) return res.status(404).send(error);

    const data = JSON.parse(body).filter((place) => {
      return place.hasOwnProperty(req.params.lang);
    });

    data.forEach((place) => {
      place.local = place[req.params.lang];
    });
    
    let dir = '';
    switch (req.params.lang) {
      case 'en':
        dir = 'ltr';
        break;
      case 'ar':
        dir = 'rtl';
        break;
      default: dir = 'rtl';
    }

    res.render('places', {
      output: data,
      localLang: req.app.locals[req.params.lang],
      lang: req.params.lang,
      dir
    });
  });
};

placeController.getSpecific = (req, res) => {
  if (req.params.lang !== 'en' && req.params.lang !== 'ar') {
    return res.status(404).send('Page does not exist');
  }

  Request(`${placesURL}/${req.params.id}`, (error, response, body) => {
    if (error) return res.status(404).send(error);

    const place = JSON.parse(body);
    place.local = place[req.params.lang];

    res.render('place', {
      place,
      localLang: req.app.locals[req.params.lang],
      lang: req.params.lang
    });
  });
};

module.exports = placeController;
