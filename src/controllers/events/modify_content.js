const Request = require('request');
const { eventsURL } = require('../../constants/urls.json');
const checkCookie = require('../../helpers/check_cookie.js');
const OTP = require('../../otp_sdk');

module.exports = async (req, res) => {
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

  checkCookie(req, async (error, decodedToken) => {
    if (error) {
      return res.status(500).send(res.locals.localText.serverError);
    }
    let headers;
    const tools = {};
    switch (req.body._method) {
      case 'post':
        tools.url = eventsURL;
        tools.urlEndpoint = 'events';
        tools.correctResponseStatusCode = 201;
        break;
      case 'put':
        tools.url = `${eventsURL}/${req.params.id}`;
        tools.urlEndpoint = `event/${req.params.id}`;
        tools.correctResponseStatusCode = 200;
        headers = {
          Authorization: 'Bearer ' + decodedToken,
        };
        break;
      default:
        return res.status(500).send(res.locals.localText.serverError);
    }

    // adds the redirectUrls to the tools
    tools.redirectUrl = JSON.stringify({
      redirectUrl: `/${req.params.lang}/${tools.urlEndpoint}`,
    });

    const reqOptions = {
      url: tools.url,
      method: req.body._method,
      data: apiBody,
      responseType: 'json',
      headers,
    };

    try {
      await OTP.events.modify(reqOptions, tools);
      res.send(tools.redirectUrl);
    } catch (error) {
      if (error.Unauthorized) {
        try {
          const newToken = await OTP.auth.getRefreshToken(req, res);
          reqOptions.headers = {
            Authorization: 'Bearer ' + newToken,
          };
          await OTP.events.modify(reqOptions, tools);
          res.send(tools.redirectUrl);
        } catch (e) {
          return res.status(500).send('Server Error');
        }
      } else {
        return res.status(500).send(error);
      }
    }
  });
};
