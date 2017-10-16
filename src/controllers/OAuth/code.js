const queryString = require('query-string');
const { oauthCodeBaseURL } = require('../../constants/urls.json');

module.exports = (req, res) => {
  const queries = {
    client_id: process.env.CLIENT_ID,
    redirect_uri: process.env.REDIRECT_URI,
    state: process.env.STATE
  };

  const stringified = queryString.stringify(queries);
  const oauthCodeURL = oauthCodeBaseURL + '?' + stringified;

  res.redirect(oauthCodeURL);
};
