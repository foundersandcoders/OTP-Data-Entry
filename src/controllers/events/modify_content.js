const checkCookie = require('../../helpers/check_cookie.js');
const OTP = require('../../otp_sdk');

module.exports = (req, res) => {
  const apiBody = {
    imageUrl: req.body.imageUrl,
    cost: req.body.cost,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    place: req.body.eventPlace,
    accessibilityOptions: req.body.accessibility || null,
  };

  if (req.body.name_en) {
    apiBody.en = {
      name: req.body.name_en,
      description: req.body.description_en,
    };
  }

  if (req.body.name_ar) {
    apiBody.ar = {
      name: req.body.name_ar,
      description: req.body.description_ar,
    };
  }

  apiBody.categories = req.body.categories;

  checkCookie(req, (error, decodedToken) => {
    if (error) {
      return res.status(500).send(res.locals.localText.serverError);
    }

    const reqOptions = {
      method: req.body._method,
      data: apiBody,
      responseType: 'json',
      headers: {
        Authorization: 'Bearer ' + decodedToken,
      },
    };

    OTP.events
      .update(reqOptions, req.params.id)
      .then(event =>
        res.send(
          JSON.stringify({
            redirectUrl: `/${req.params.lang}/event/${event._id}`,
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
              reqOptions.headers = {
                Authorization: 'Bearer ' + tokens.access_token,
              };
              OTP.events
                .modify(reqOptions, req.params.id)
                .then(event =>
                  res.send(
                    JSON.stringify({
                      redirectUrl: `/${req.params.lang}/event/${event._id}`,
                    }),
                  ),
                )
                .catch(e =>
                  res
                    .status(500)
                    .send('You are not authorised to access this resource'),
                );
            })
            .catch(e =>
              res
                .status(500)
                .send('You are not authorised to access this resource'),
            );
        } else {
          res.status(500).send('Server Error');
        }
      });
  });
};
