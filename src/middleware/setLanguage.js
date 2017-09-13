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
  req.app.locals.localText = req.app.locals[lang];
  req.app.locals.lang = lang;
  req.app.locals.dir = dir;

  next();
};
