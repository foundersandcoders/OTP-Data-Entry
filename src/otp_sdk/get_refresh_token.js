const verifyToken = require('../helpers/verify_token.js');
const axios = require('axios');
const qs = require('querystring');
const jwt = require('jsonwebtoken');
const { oauthTokenBaseURL } = require('../constants/urls.json');

module.exports = (req, res) => {
  const requestToken = token => {
    console.log(1);
    const tokenQueries = {
      grant_type: 'refresh_token',
      refresh_token: token.refresh_token,
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      redirect_uri: process.env.REDIRECT_URI,
    };

    const options = {
      method: 'post',
      baseURL: oauthTokenBaseURL,
      data: qs.stringify(tokenQueries),
    };

    return new Promise(async (resolve, reject) => {
      try {
        const apiTokenResponse = await axios(options);
        const { access_token, refresh_token } = apiTokenResponse.data;
        const token = jwt.sign(
          { access_token, refresh_token },
          process.env.JWT_SECRET,
        );
        res.clearCookie('access');
        res.cookie('access', token, { maxAge: 604800000 });
        resolve(access_token);
      } catch (e) {
        reject(e);
      }
    });
  };

  return new Promise(async (resolve, reject) => {
    verifyToken(req)
      .then(requestToken)
      .then(token => resolve(token))
      .catch(reject);
  });
};
