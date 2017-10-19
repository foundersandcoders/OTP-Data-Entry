// This handler redirects the users to the tourism platform login
// page with the queries so they would be redirected back to /oauth/token
// with the code!

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
