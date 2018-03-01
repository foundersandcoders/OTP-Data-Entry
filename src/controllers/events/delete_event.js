const Request = require('request');
const { eventsURL } = require('../../constants/urls.json');
const jwt = require('jsonwebtoken');

module.exports = (req, res) => {
  if (req.cookies && req.cookies.access) {
    jwt.verify(
      req.cookies.access,
      process.env.JWT_SECRET,
      (error, decodedToken) => {
        if (error) {
          return res.render('error', {
            statusCode: 500,
            errorMessage: res.locals.localText.serverError,
          });
        } else {
          const reqOptions = {
            url: `${eventsURL}/${req.params.id}`,
            method: 'DELETE',
            auth: {
              bearer: decodedToken.access_token,
            },
          };

          Request(reqOptions, (error, response, body) => {
            if (error) {
              return res.render('error', {
                statusCode: 500,
                errorMessage: res.locals.localText.serverError,
              });
            }
            if (response.statusCode !== 204) {
              return res.render('error', {
                statusCode: 400,
                errorMessage: res.locals.localText.badRequest,
              });
            } else {
              res.redirect(`/${req.params.lang}/events`);
            }
          });
        }
      },
    );
  } else {
    return res.redirect('error', {
      statusCode: 500,
      errorMessage: res.locals.localText.serverError,
    });
  }
};
