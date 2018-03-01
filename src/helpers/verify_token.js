const jwt = require('jsonwebtoken');

module.exports = reqCookiesObject => {
  const { access } = reqCookiesObject && reqCookiesObject;

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
