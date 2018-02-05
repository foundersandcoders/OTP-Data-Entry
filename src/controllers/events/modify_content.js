const Request = require('request');
const { eventsURL } = require('../../constants/urls.json');
const checkCookie = require('../../helpers/check_cookie.js');
const getRefreshToken = require('../../helpers/get_refresh_token.js');

module.exports = (req, res) => {
  const apiBody = {
    imageUrl: req.body.imageUrl,
    cost: req.body.cost,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    place: req.body.eventPlace,
    accessibilityOptions: req.body.accessibility || null,
  };

  if (req.body.name_en) {
    apiBody.en = {
      name: req.body.name_en,
      description: req.body.description_en,
    };
  }

  if (req.body.name_ar) {
    apiBody.ar = {
      name: req.body.name_ar,
      description: req.body.description_ar,
    };
  }

  apiBody.categories = req.body.categories;

  checkCookie(req, (error, decodedToken) => {
    if (error) {
      return res.status(500).send(res.locals.localText.serverError);
    }
    let url, urlEndpoint, correctResponseStatusCode, auth;
    switch (req.body._method) {
      case 'post':
        url = eventsURL;
        urlEndpoint = 'events';
        correctResponseStatusCode = 201;
        break;
      case 'put':
        url = `${eventsURL}/${req.params.id}`;
        urlEndpoint = `event/${req.params.id}`;
        correctResponseStatusCode = 200;
        auth = {
          bearer: decodedToken,
        };
        break;
      default:
        return res.status(500).send(res.locals.localText.serverError);
    }
    const reqOptions = {
      url,
      method: req.body._method,
      body: apiBody,
      json: true,
      auth,
    };
    Request(reqOptions, (error, apiResponse, apiResponseBody) => {
      if (error) {
        return res.status(500).send(res.locals.localText.serverError);
      } else if (apiResponse.statusCode !== correctResponseStatusCode) {
        if (apiResponseBody.error === 'Unauthorized') {
          getRefreshToken(req, res)
            .then(() => res.status(400).send('Try again'))
            .catch(() => res.status(500).send('Server error! try again'));
        } else {
          return res
            .status(apiResponseBody.statusCode)
            .send(apiResponseBody.message);
        }
      } else {
        res.end(
          JSON.stringify({ redirectUrl: `/${req.params.lang}/${urlEndpoint}` }),
        );
      }
    });
  });
};
