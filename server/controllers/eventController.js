const Event = require('../models/eventModel');

// GET
async function getEvents (req, res) {
  try {
    const events = await Event.find().sort({date: 1}).exec(); // sort events in descending order
    res.status(200).json(events);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}


// POST
async function postEvent (req, res) {
  const { title, date, venue, city } = req.body;

  // console.log('Request body:', req.body);

  try {
    // Validate required fields before saving
    if (!title || !date || !venue || !city) {
      return res.status(400).json({ message: "Please provide all required fields: title, date, venue, city" });
    }
    c
    const event = new Event({
      title,
      date,
      venue,
      city,
    });

    // console.log('Server post new event: ', event)

    const newEvent = await event.save();
    res.status(201).json(newEvent);
  } catch (err) {
    // Check for specific validation errors from Mongoose
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map(error => error.message);
      return res.status(400).json({ message: `Validation error: ${errors.join(', ')}` });
    }
    res.status(500).json({ message: err.message });
  }

}


// DELETE (OPTIONAL - only use in case you want to remove a data record)
async function deleteEvent (req, res) {
  try {
    const id = req.params._id;
    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).send('Cannot find event');
    }

    await event.deleteOne();
    res.json({message: 'Deleted topic successfully'});
  } catch (err) {
    console.error('Error deleting event: ', err);
    res.status(500).json({message: err.message});
  }
}


module.exports = { getEvents, postEvent, deleteEvent };