module.exports = (req, res, next) => {
  const path = req.path;
  const lang = path.split('/')[1];

  if (lang !== 'en' && lang !== 'ar') {
    if (path === '/') {
      return next();
    } else {
      return res.render('error', {
        statusCode: 404,
        errorMessage: res.local.localText.notFound
      });
    }
  }
  next();
};
