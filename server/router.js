const router = require('express').Router();
const controller = require('./controllers/eventController');

// GET
router.get('/events', controller.getEvents);

// POST
router.post('/events/add', controller.postEvent);

// DELETE 
router.delete('/events/:_id', controller.deleteEvent);

// UPDATE
router.put('/events/edit/:_id', controller.editEvent);



module.exports = router;