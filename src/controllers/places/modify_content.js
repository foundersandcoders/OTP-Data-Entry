const Request = require('request');
const { placesURL } = require('../../constants/urls.json');
const getLatLng = require('../../helpers/getLatLng.js');

module.exports = (req, res) => {
  const apiBody = {
    imageUrl: req.body.imageUrl,
    website: req.body.website,
    phone: req.body.phone,
    email: req.body.email
  };

  if (req.body.name_en) {
    apiBody.en = {
      name: req.body.name_en,
      description: req.body.description_en,
      address: req.body.address_en,
      openingHours: req.body.openingHours_en
    };
  }

  if (req.body.name_ar) {
    apiBody.ar = {
      name: req.body.name_ar,
      description: req.body.description_ar,
      address: req.body.address_ar,
      openingHours: req.body.openingHours_ar
    };
  }

  if (req.body.ownerId) apiBody.owner = req.body.ownerId;
  if (req.body.categories) apiBody.categories = req.body.categories;
  if (req.body.accessibility) apiBody.accessibility = req.body.accessibility;

  getLatLng(req.body.address, (err, response) => {
    if (!err) {
      apiBody.location = [response.lng, response.lat];
    }
  });

  let url, urlEndpoint, correctResponseStatusCode;
  switch (req.body._method) {
    case 'post':
      url = placesURL;
      urlEndpoint = 'places';
      correctResponseStatusCode = 201;
      break;
    case 'put':
      url = `${placesURL}/${req.params.id}`;
      urlEndpoint = `place/${req.params.id}`;
      correctResponseStatusCode = 200;
      break;
    default:
      res.status(500).send('server error');
  }

  const reqOptions = {
    url,
    method: req.body._method,
    body: apiBody,
    json: true
  };
  Request(reqOptions, (error, apiResponse, apiResponseBody) => {
    if (error) {
      res.status(400).send('server error');
    }
    if (apiResponse.statusCode !== correctResponseStatusCode) {
      res.status(400).send(apiResponseBody);
    } else {
      res.redirect(`/${req.params.lang}/${urlEndpoint}`);
    }
  });
};
