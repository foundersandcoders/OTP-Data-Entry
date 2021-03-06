const router = require('express').Router();
const placeController = require('./places/index.js');
const eventsController = require('./events/index.js');
const placesList = require('../middleware/getPlaceNameAndId.js');
const oauthCode = require('./OAuth/code.js');
const oauthToken = require('./OAuth/token.js');
const checkLoggedIn = require('../middleware/checkLoggedIn.js');

router.get('/', require('./home.js'));
router.get('/sign-s3', require('./sign_s3.js'));
router.get('/:lang/content', require('../content.js'));

// places
router.get('/:lang/places', placeController.getAll);
router.get('/:lang/place/:id', placeController.getSpecific);
router.get('/:lang/add-place', checkLoggedIn, placeController.renderForm);
router.post('/:lang/add-place', checkLoggedIn, placeController.addPlace);
router.get(
  '/:lang/edit-place/:id',
  checkLoggedIn,
  placeController.renderEditForm,
);
router.post('/:lang/edit-place/:id', checkLoggedIn, placeController.addPlace);
router.get(
  '/:lang/delete-place/:id',
  checkLoggedIn,
  placeController.deletePlace,
);

// events
router.get('/:lang/events', eventsController.getAll);
router.get('/:lang/event/:id', eventsController.getSpecific);
router.get(
  '/:lang/delete-event/:id',
  checkLoggedIn,
  eventsController.deleteEvent,
);
router.get('/:lang/add-event', checkLoggedIn, placesList, eventsController.renderForm);
router.post('/:lang/add-event', checkLoggedIn, eventsController.addEvent);
router.get(
  '/:lang/edit-event/:id',
  checkLoggedIn,
  placesList,
  eventsController.renderEditForm,
);
router.post('/:lang/edit-event/:id', checkLoggedIn, eventsController.addEvent);

router.get('/:lang/login', oauthCode);
router.get('/oauth/token', oauthToken);

module.exports = router;
