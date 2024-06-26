const Event = require('../models/eventModel');

// GET
async function getEvents (req, res) {
  try {
    const events = await Event.find().sort({date: 1}).exec(); // sort events in descending order
    res.json(events);
    res.status = 200;

  } catch (err) {
    res.json({message: err.message});
    res.status = 500;
  }
}


// POST
async function postEvent (req, res) {
  const event = new Event({
    title: req.body.title,
    date: req.body.date,
    venue: req.body.venue,
    venue: req.body.city,
  });
  try {
    const newEvent = await event.save();
    res.json(newEvent);
    res.status = 201;

  } catch (err) {
    res.json({message: err.message});
    res.status = 400;
  }
}


// DELETE (OPTIONAL - only use in case you want to remove a data record)
async function deleteEvent (req, res) {
  try {
    const id = req.params.id;
    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).send('Cannot find event');
    }

    await event.deleteOne();
    res.json({message: 'Deleted topic successfully'});
  } catch (err) {
    res.status(500).json({message: err.message});
  }
}


module.exports = { getEvents, postEvent, deleteEvent };