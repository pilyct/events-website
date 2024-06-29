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
async function postEvent(req, res) {
  const { title, date, venue, city } = req.body;

  // console.log('Request body:', req.body);

  try {
    // Validate required fields before saving
    if (!title || !date || !venue || !city) {
      return res.status(400).json({ message: "Please provide all required fields: title, date, venue, city" });
    }
    
    const event = new Event({
      title,
      date,
      venue,
      city,
    });

    // console.log('Server post new event: ', event);

    const newEvent = await event.save();
    res.status(201).json(newEvent);
  } catch (err) {
    console.error('Error while saving event:', err);

    // Check for specific validation errors from Mongoose
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map(error => error.message);
      return res.status(400).json({ message: `Validation error: ${errors.join(', ')}` });
    }
    
    res.status(500).json({ message: 'Internal Server Error' });
  }
}



// DELETE 
async function deleteEvent (req, res) {
  try {
    // console.log('Request Params:', req.params);
    const id = req.params._id;
    const event = await Event.findById(id);
    // console.log('Event: ', Event)
    // console.log('Event by Id', event)

    if (!event) {
      return res.status(404).send('Cannot find event');
    }

    await event.deleteOne();
    res.json({message: 'Event deleted successfully'});
  } catch (err) {
    console.error('Error deleting event: ', err);
    res.status(500).json({message: err.message});
  }
}

/// UPDATE
async function editEvent(req, res) {
  try {
    const id = req.params._id;
    const { title, date, venue, city } = req.body;

    if (!title || !date || !venue || !city) {
      return res.status(400).json({ message: "Please provide all required fields: title, date, venue, city" });
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      { title, date, venue, city },
      { new: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json(updatedEvent);
    console.log('Event edited successfully');
    
  } catch (err) {
    console.error('Error updating event:', err);
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map(error => error.message);
      return res.status(400).json({ message: `Validation error: ${errors.join(', ')}` });
    }
    res.status(500).json({ message: 'Internal Server Error' });
  }
}


module.exports = { getEvents, postEvent, deleteEvent, editEvent };