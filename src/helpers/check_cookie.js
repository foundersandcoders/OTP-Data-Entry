const jwt = require('jsonwebtoken');

const checkCookie = (req, cb) => {
  if (req.cookies && req.cookies.access) {
    jwt.verify(req.cookies.access, process.env.JWT_SECRET, (error, decoded) => {
      if (error) cb(error);
      else {
        cb(null, decoded.access_token);
      }
    });
  } else {
    cb();
  }
};

module.exports = checkCookie;
