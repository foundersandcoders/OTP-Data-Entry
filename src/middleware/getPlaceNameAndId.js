const Request = require('request');
const { placesURL } = require('../constants/urls.json');

module.exports = (req, res, next) => {
  const options = {
    method: 'GET',
    json: true,
    url: placesURL
  };
  Request(options, (error, result, body) => {
    const defaultLang = req.params.lang;
    const alternativeLang = (defaultLang === 'en') ? 'ar' : 'en';

    if (error) {
      return res.render('error', {
        statusCode: 500,
        errorMessage: res.locals.localText.serverError
      });
    } else {
      res.locals.placesNamesAndIds = result.body.map(place => {
        return {
          name: place[defaultLang] ? place[defaultLang].name : place[alternativeLang].name,
          id: place._id
        };
      }).sort((first, second) => {
        const firstPlace = first.name.toUpperCase();
        const secondPlace = second.name.toUpperCase();
        return (firstPlace < secondPlace) ? -1 : (firstPlace > secondPlace) ? 1 : 0;
      });
    }
    return next();
  });
};
