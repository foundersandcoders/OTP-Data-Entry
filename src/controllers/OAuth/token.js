// This handler gets the state and the code from the url and if the state
// matches our state ,exchange the code for a token and store it in a cookie
const queryString = require('query-string');
const Request = require('request');
const jwt = require('jsonwebtoken');
const { oauthTokenBaseURL } = require('../../constants/urls.json');

module.exports = (req, res) => {
  const tokenQueries = {
    code: req.query.code,
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    redirect_uri: process.env.REDIRECT_URI,
    grant_type: 'authorization_code',
  };

  const options = {
    method: 'POST',
    uri: oauthTokenBaseURL,
    body: queryString.stringify(tokenQueries),
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
    },
  };

  if (req.query.state !== process.env.STATE) {
    return res.redirect('error', {
      statusCode: 400,
      errorMessage:
        'Something went wrong with your login information! please try again.',
    });
  } else {
    Request(options, (error, responseToken, body) => {
      if (error || responseToken.statusCode !== 200) {
        return res.redirect('error', {
          statusCode: 500,
          errorMessage: 'Server error!',
        });
      } else {
        const { access_token, refresh_token } = JSON.parse(body);
        const token = jwt.sign(
          { access_token, refresh_token },
          process.env.JWT_SECRET,
        );
        res.cookie('access', token, { maxAge: 604800000 });

        if (req.cookies && req.cookies.referredUrl) {
          res.redirect(req.cookies.referredUrl);
        } else {
          res.redirect('/');
        }
      }
    });
  }
};
