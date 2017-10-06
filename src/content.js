const text = require('./text.js');

module.exports = (req, res) => {
  res.render('content', {
    places: text.plcesTitle,
    events: text.eventsTitle
  });
};
