const Request = require('request');
const { placesURL } = require('../constants/urls.json');

module.exports = (req, res, next) => {
  const options = {
    method: 'GET',
    json: true,
    url: placesURL
  };

  Request(options, (error, result, body) => {
    if (error) {
      return res.render('error', {
        statusCode: 500,
        errorMessage: res.locals.localText.serverError
      });
    } else {
      res.locals.places = result.body.map(place => {
        if (place.en) {
          return {
            name: place.en.name,
            id: place._id
          };
        } else {
          return {
            name: place.ar.name,
            id: place._id
          };
        }
      }).sort((first, second) => {
        const fisrtPlace = first.name.toUpperCase();
        const secondPlace = second.name.toUpperCase();
        return (fisrtPlace < secondPlace) ? -1 : (fisrtPlace > secondPlace) ? 1 : 0;
      });
    }
    return next();
  });
};
