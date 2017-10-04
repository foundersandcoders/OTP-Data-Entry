const Request = require('request');
const { eventsURL } = require('../../constants/urls.json');

module.exports = (req, res) => {
  const reqOptions = {
    url: `${eventsURL}/${req.params.id}`,
    method: 'DELETE'
  };

  Request(reqOptions, (error, response) => {
    if (error) {
      return res.render('error', {
        statusCode: 500,
        errorMessage: res.locals.localText.serverError
      });
    }
    if (response.statusCode !== 204) {
      return res.render('error', {
        statusCode: 400,
        errorMessage: res.locals.localText.badRequest
      });
    } else {
      res.redirect(`/${req.params.lang}/events`);
    }
  });
};
