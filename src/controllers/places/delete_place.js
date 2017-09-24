const Request = require('request');
const { placesURL } = require('../../constants/urls.json');

module.exports = (req, res) => {
  const reqOptions = {
    url: `${placesURL}/${req.params.id}`,
    method: 'DELETE'
  };

  Request(reqOptions, (error, response) => {
    if (error) {
      res.send('huge failure');
    }
    if (response.statusCode !== 204) {
      return res.status(404).send(error);
    } else {
      res.redirect(`/${req.params.lang}/places`);
    }
  });
};
