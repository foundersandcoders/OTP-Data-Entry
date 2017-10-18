const jwt = require('jsonwebtoken');

const checkCookie = (req, cb) => {
  if (req.cookies.token) {
    jwt.verify(req.cookies.token, process.env.JWT_SECRET, (error, decoded) => {
      if (error) cb(error);
      else {
        cb(null, decoded);
      }
    });
  } else {
    cb();
  }
};

module.exports = checkCookie;
