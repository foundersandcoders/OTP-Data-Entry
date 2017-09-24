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
    }

    const url = req.body._method === 'put' ? `${placesURL}/${req.params.id}` : placesURL;

    const reqOptions = {
      url: url,
      method: req.body._method,
      body: apiBody,
      json: true
    };
    Request(reqOptions, (error, apiResponse, apiResponseBody) => {
      if (error) {
        res.send('huge failure');
      }
      if ((reqOptions.method === 'put' && apiResponse.statusCode !== 200) || (reqOptions.method === 'post' && apiResponse.statusCode !== 201)) {
        res.status(404).send(apiResponseBody);
      } else {
        const urlEnd = req.body._method === 'put' ? `place/${req.params.id}` : 'places';
        res.redirect(`/${req.params.lang}/${urlEnd}`);
      }
    });
  });
};
