const router = require('express').Router();

const placeController = require('./places.js');

router.get('/', require('./home.js'));
router.get('/:lang/places', placeController.getAll);

module.exports = router;
