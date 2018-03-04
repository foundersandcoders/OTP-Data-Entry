const axios = require('axios');

module.exports.modify = (options, tools) => {
  return new Promise(async (resolve, reject) => {
    try {
      await axios(options);
      resolve();
    } catch (error) {
      error.response.data.error === 'Unauthorized'
        ? reject({ Unauthorized: true })
        : reject();
    }
  });
};
