module.exports = (req, res) => {
  res.render('home', {
    english: req.app.locals.en.english,
    arabic: req.app.locals.ar.arabic
  });
};
