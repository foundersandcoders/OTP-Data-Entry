const text = require('../text.js');

module.exports = (req, res) => {
  res.render('home', {
    english: text.en.english,
    arabic: text.ar.arabic
  });
};
