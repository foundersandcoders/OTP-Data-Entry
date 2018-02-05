const jwt = require('jsonwebtoken');

module.exports = req => {
  const { access } = req.cookies && req.cookies;

  return new Promise((resolve, reject) => {
    jwt.verify(access, process.env.JWT_SECRET, (error, decoded) => {
      if (error) {
        return reject(error);
      } else {
        return resolve(decoded);
      }
    });
  });
};
