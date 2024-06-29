const router = require('express').Router();
const controller = require('./controllers/eventController');

// GET
router.get('/events', controller.getEvents);

// POST
router.post('/events', controller.postEvent);

// DELETE - Testing purposes
router.delete('/events/:_id', controller.deleteEvent); // OPTIONAL - only use in case you want to remove a data record




module.exports = router;