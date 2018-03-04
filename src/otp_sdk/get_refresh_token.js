const verifyToken = require('../helpers/verify_token.js');
const axios = require('axios');
const qs = require('querystring');
const jwt = require('jsonwebtoken');
const { oauthTokenBaseURL } = require('../constants/urls.json');

module.exports = reqCookiesObject => {
  const requestToken = async token => {
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
    try {
      const apiTokenResponse = await axios(options);
      const { access_token, refresh_token } = apiTokenResponse.data;
      const token = await jwt.sign(
        { access_token, refresh_token },
        process.env.JWT_SECRET,
      );
      return { access_token, token };
    } catch (e) {
      return e;
    }
  };

  return new Promise((resolve, reject) => {
    verifyToken(reqCookiesObject)
      .then(requestToken)
      .then(tokens => resolve(tokens))
      .catch(reject);
  });
};
