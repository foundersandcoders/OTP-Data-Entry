// This middleware checks for a token cookie if it does exist pass next
// if not, redirect to the login page and create a cookie with the
// referredUrl to know where to go back to after looged in!

const jwt = require('jsonwebtoken');
const verifyToken = require('../helpers/verify_token.js');

module.exports = (req, res, next) => {
  const access = req.cookies && req.cookies.access;

  if (access) {
    verifyToken(req.cookies)
      .then(() => next())
      .catch(err => res.redirect(`/${req.params.lang}/login`));
  } else {
    res.cookie('referredUrl', req.url, { maxAge: 300000 });
    return res.redirect(`/${req.params.lang}/login`);
  }
};
