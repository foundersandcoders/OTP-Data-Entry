const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.cookies.token;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (error) => {
      if (error) {
        return res.redirect(`/${req.params.lang}/loginOauth`);
      } else {
        return next();
      }
    });
  } else {
    res.cookie('referredUrl', req.url, {maxAge: 300000});
    return res.redirect(`/${req.params.lang}/loginOauth`);
  }
};
