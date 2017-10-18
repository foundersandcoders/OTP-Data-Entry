// This middleware checks for a token cookie if it does exist pass next
// if not, redirect to the login page and create a cookie with the
// referredUrl to know where to go back to after looged in!

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.cookies && req.cookies.token;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (error) => {
      if (error) {
        return res.redirect(`/${req.params.lang}/login`);
      } else {
        return next();
      }
    });
  } else {
    res.cookie('referredUrl', req.url, {maxAge: 300000});
    return res.redirect(`/${req.params.lang}/login`);
  }
};
