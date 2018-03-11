const { placesURL } = require('../../constants/urls.json');
const getLatLng = require('../../helpers/getLatLng.js');
const checkCookie = require('../../helpers/check_cookie.js');
const OTP = require('../../otp_sdk');

module.exports = (req, res) => {
  const apiBody = {
    imageUrl: req.body.imageUrl,
    website: req.body.website,
    phone: req.body.phone,
    email: req.body.email,
  };

  if (req.body.name_en) {
    apiBody.en = {
      name: req.body.name_en,
      description: req.body.description_en,
      address: req.body.address_en,
      openingHours: req.body.openingHours_en,
    };
  }

  if (req.body.name_ar) {
    apiBody.ar = {
      name: req.body.name_ar,
      description: req.body.description_ar,
      address: req.body.address_ar,
      openingHours: req.body.openingHours_ar,
    };
  }

  if (req.body.ownerId) apiBody.owner = req.body.ownerId;
  if (req.body.categories) apiBody.categories = req.body.categories;
  if (req.body.accessibility)
    apiBody.accessibilityOptions = req.body.accessibility;

  getLatLng(req.body.address, (err, response) => {
    if (!err) {
      apiBody.location = [response.lng, response.lat];
    }
  });

  checkCookie(req, (err, decodedToken) => {
    if (err) {
      return res.status(500).send(res.locals.localText.serverError);
    }

    let headers;
    const tools = {};
    switch (req.body._method) {
      case 'post':
        tools.url = placesURL;
        tools.urlEndpoint = 'places';
        tools.correctResponseStatusCode = 201;
        break;
      case 'put':
        tools.url = `${placesURL}/${req.params.id}`;
        tools.urlEndpoint = `PLACE/${req.params.id}`;
        tools.correctResponseStatusCode = 200;
        headers = {
          Authorization: 'Bearer ' + decodedToken,
        };
        break;
      default:
        return res.status(500).send(res.locals.localText.serverError);
    }

    // adds the redirectUrls to the tools
    tools.redirectUrl = JSON.stringify({
      redirectUrl: `/${req.params.lang}/${tools.urlEndpoint}`,
    });

    const reqOptions = {
      url: tools.url,
      method: req.body._method,
      data: apiBody,
      responseType: 'json',
      headers,
    };

    OTP.events
      .modify(reqOptions, tools)
      .then(() => res.send(tools.redirectUrl))
      .catch(err => {
        if (err.Unauthorized) {
          OTP.auth
            .getRefreshToken(req.cookies)
            .then(tokens => {
              res.clearCookie('access');
              res.cookie('access', tokens.token, { maxAge: 604800000 });
              reqOptions.headers = {
                Authorization: 'Bearer ' + tokens.access_token,
              };
              OTP.events
                .modify(reqOptions, tools)
                .then(() => res.send(tools.redirectUrl))
                .catch(e => res.status(500).send('Server Error'));
            })
            .catch(e => res.status(500).send('Server Error'));
        }
      });
  });
};
