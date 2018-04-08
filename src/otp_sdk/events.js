const axios = require('axios');
const { eventsURL } = require('../constants/urls.json');

module.exports.update = (options, id) => {
  return new Promise(async (resolve, reject) => {
    let reqOpts;
    switch (options.method) {
      case 'post':
        reqOpts = Object.assign({}, options, { url: eventsURL });
        break;
      case 'put':
        reqOpts = Object.assign({}, options, {
          url: `${eventsURL}/${id}`,
        });
        break;
      default:
        reject({});
    }

    try {
      const newEvent = await axios(reqOpts);
      resolve(newEvent.data);
    } catch (error) {
      error.response.data.error === 'Unauthorized'
        ? reject({ Unauthorized: true })
        : reject({});
    }
  });
};
