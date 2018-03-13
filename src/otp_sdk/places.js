const axios = require('axios');
const { placesURL } = require('../constants/urls.json');

module.exports.update = (options, id) => {
  return new Promise(async (resolve, reject) => {
    let reqOpts;
    switch (options.method) {
      case 'post':
        reqOpts = Object.assign({}, options, { url: placesURL });
        break;
      case 'put':
        reqOpts = Object.assign({}, options, {
          url: `${placesURL}/${id}`,
        });
        break;
      default:
        reject();
    }
    try {
      const newPlace = await axios(reqOpts);
      resolve(newPlace.data);
    } catch (error) {
      error.response.data.error === 'Unauthorized'
        ? reject({ Unauthorized: true })
        : reject({});
    }
  });
};
