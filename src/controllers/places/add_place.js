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
