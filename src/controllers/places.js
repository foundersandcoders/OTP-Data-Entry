const Request = require('request');
const { placesURL } = require('../constants/urls.json');
const placeController = {};
const getLatLng = require('./getLatLng.js');

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

    res.render('place', {
      place,
      localLang: req.app.locals[req.params.lang],
      lang: req.params.lang,
      dir
    });
  });
};

placeController.renderForm = (req, res) => {
  if (req.params.lang !== 'en' && req.params.lang !== 'ar') {
    return res.status(404).send('Page does not exist');
  }

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

  res.render('place-form', {
    localLang: req.app.locals[req.params.lang],
    lang: req.params.lang,
    dir
  });
};

placeController.addPlace = (req, res) => {
  if (req.params.lang !== 'en' && req.params.lang !== 'ar') {
    return res.status(404).send('Page does not exist');
  }

  const apiBody = {
    imageUrl: req.body.imageUrl,
    website: req.body.website,
    phone: req.body.phone,
    email: req.body.email
  };

  const lang = {
    name: req.body.name,
    description: req.body.description,
    address: req.body.address,
    openingHours: req.body.openingHours
  };

  apiBody[req.params.lang] = lang;
  if (req.body.ownerId) apiBody.owner = req.body.ownerId;
  if (req.body.categories) apiBody.categories = req.body.categories;
  if (req.body.accessibility) apiBody.accessibility = req.body.accessibility;

  getLatLng(req.body.address, (err, response) => {
    if (!err) {
      apiBody.location = [response.lat, response.lng];
      console.log(apiBody);
    }

    const reqOptions = {
      url: placesURL,
      method: 'POST',
      body: apiBody,
      json: true
    };

    Request(reqOptions, (error, postRes, postResBody) => {
      if (error) {
        console.log(error);
        res.send('huge failure');
      } else {
        console.log(postResBody);
        res.redirect(`/${req.params.lang}/places`);
      }
    });
  });
};

module.exports = placeController;
