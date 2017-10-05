const Request = require('request');
const { eventsURL } = require('../../constants/urls.json');

module.exports = (req, res) => {
  const apiBody = {
    imageUrl: req.body.imageUrl,
    cost: req.body.cost,
    startTime: req.body.startDate,
    endTime: req.body.endDate,
    place: req.body.eventPlace
  };

  if (req.body.name_en) {
    apiBody.en = {
      name: req.body.name_en,
      description: req.body.description_en
    };
  }

  if (req.body.name_ar) {
    apiBody.ar = {
      name: req.body.name_ar,
      description: req.body.description_ar
    };
  }

  apiBody.categories = req.body.categories;
  if (req.body.accessibility) apiBody.accessibilityOptions = req.body.accessibility;

  let url, urlEndpoint, correctResponseStatusCode;
  switch (req.body._method) {
    case 'post' :
      url = eventsURL;
      urlEndpoint = 'events';
      correctResponseStatusCode = 201;
      break;
    case 'put':
      url = `${eventsURL}/${req.params.id}`;
      urlEndpoint = `place/${req.params.id}`;
      correctResponseStatusCode = 200;
      break;
    default:
      return res.render('error', {
        statusCode: 500,
        errorMessage: res.locals.localText.serverError
      });
  }
  const reqOptions = {
    url,
    method: req.body._method,
    body: apiBody,
    json: true
  };
  Request(reqOptions, (error, apiResponse, apiResponseBody) => {
    if (error) {
      res.render('error', {
        statusCode: 500,
        errorMessage: res.locals.localText.serverError
      });
    }
    if (apiResponse.statusCode !== correctResponseStatusCode) {
      return res.render('error', {
        statusCode: 400,
        errorMessage:
      res.locals.localText.badRequest
      });
    } else {
      res.redirect(`/${req.params.lang}/${urlEndpoint}`);
    }
  });
};
