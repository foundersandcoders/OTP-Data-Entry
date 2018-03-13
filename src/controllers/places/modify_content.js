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
    const opts = {
      method: req.body._method,
      data: apiBody,
      responseType: 'json',
      headers: {
        Authorization: 'Bearer ' + decodedToken,
      },
    };

    OTP.places
      .update(opts, req.params.id)
      .then(place =>
        res.send(
          JSON.stringify({
            redirectUrl: `/${req.params.lang}/place/${place._id}`,
          }),
        ),
      )
      .catch(err => {
        if (err.Unauthorized) {
          OTP.auth
            .getRefreshToken(req.cookies)
            .then(tokens => {
              res.clearCookie('access');
              res.cookie('access', tokens.token, { maxAge: 604800000 });
              opts.headers = {
                Authorization: 'Bearer ' + tokens.access_token,
              };
              OTP.places
                .modify(opts, req.params.id)
                .then(place => {
                  return res.send(
                    JSON.stringify({
                      redirectUrl: `/${req.params.lang}/place/${place._id}`,
                    }),
                  );
                })
                .catch(e => res.status(500).send('Server Error'));
            })
            .catch(e => res.status(500).send('Server Error'));
        } else {
          res.status(500).send('Server Error');
        }
      });
  });
};
