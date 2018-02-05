const verifyToken = require('./verify_token.js');
const queryString = require('query-string');
const Request = require('request');
const jwt = require('jsonwebtoken');
const { oauthTokenBaseURL } = require('../constants/urls.json');

module.exports = (req, res) => {
  const requestToken = token => {
    const tokenQueries = {
      grant_type: 'refresh_token',
      refresh_token: token.refresh_token,
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      redirect_uri: process.env.REDIRECT_URI,
    };

    const options = {
      method: 'POST',
      uri: oauthTokenBaseURL,
      body: queryString.stringify(tokenQueries),
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      },
    };
    return new Promise((resolve, reject) => {
      Request(options, (error, responseToken, body) => {
        if (error || responseToken.statusCode !== 200) {
          reject(error);
        } else {
          const { access_token, refresh_token } = JSON.parse(body);
          const token = jwt.sign(
            { access_token, refresh_token },
            process.env.JWT_SECRET,
          );
          res.clearCookie('access');
          res.cookie('access', token, { maxAge: 604800000 });
          resolve();
        }
      });
    });
  };

  return new Promise((resolve, reject) => {
    verifyToken(req)
      .then(requestToken)
      .then(() => resolve())
      .catch(() => reject());
  });
};
