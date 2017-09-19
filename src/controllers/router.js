const router = require('express').Router();
const placeController = require('./places/index.js');
// const eventsController = require('./events/index.js');

router.get('/', require('./home.js'));
router.get('/:lang/places', placeController.getAll);
router.get('/:lang/place/:id', placeController.getSpecific);
router.get('/:lang/add-place', placeController.renderForm);
router.post('/:lang/add-place', placeController.addPlace);
router.get('/:lang/edit-place/:id', placeController.getSpecific);

module.exports = router;
