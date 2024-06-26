const mongoose = require('./db');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required:true
  },
  date: {
    type: Date,
    required: true
  } ,
  venue: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  }
});



const Event = mongoose.model('Event', eventSchema);

module.exports = Event;