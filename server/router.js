const router = require('express').Router();
const controller = require('./controllers/eventController');

// GET
router.get('/events', controller.getEvents);

// POST
router.post('/events', controller.postEvent);



module.exports = router;