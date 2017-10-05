module.exports = (req, res) => {
  res.render('event-form', {
    places: res.locals.places
  });
};
