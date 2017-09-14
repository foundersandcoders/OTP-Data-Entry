module.exports = (req, res, next) => {
  const path = req.path;
  const lang = path.split('/')[1];
  let dir = '';
  switch (lang) {
    case 'en':
      dir = 'ltr';
      break;
    case 'ar':
      dir = 'rtl';
      break;
    default: dir = 'rtl';
  }
  res.locals.localText = req.app.locals[lang];
  res.locals.lang = lang;
  res.locals.dir = dir;

  next();
};
