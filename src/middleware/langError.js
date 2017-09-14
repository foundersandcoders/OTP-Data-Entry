module.exports = (req, res, next) => {
  const path = req.path;
  const lang = path.split('/')[1];

  if (lang !== 'en' && lang !== 'ar') {
    if (path === '/') {
      return next();
    } else {
      return res.status(404).send('Page does not exist');
    }
  }
  next();
};
