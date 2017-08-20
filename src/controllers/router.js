const router = require('express').Router();

router.get('/', require('./home.js'));
router.get('/en/places', require('./places.js').getAll);

module.exports = router;
