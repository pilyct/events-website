import React, { useState } from 'react';
import './EventForm.css';
import { getCurrentDateTime } from '../utils/getCurrentTime';
// import { postEvent } from '../services/api-service';

export default function EventForm({ setEvents, events }) {

  const TITLE = 'Create a new event';

  const [title, setTitle] = useState('');
  const [date, setDate] = useState(getCurrentDateTime());
  const [venue, setVenue] = useState('');
  const [city, setCity] = useState('');

  function handleTitleChange(event) {
    setTitle(event.target.value);
  }
  function handleDateChange(event) {
    setDate(event.target.value);
  }
  function handleVenueChange(event) {
    setVenue(event.target.value);
  }
  function handleCityChange(event) {
    setCity(event.target.value);
  }


  function handleSubmit (event) { // when clicking the submit button
    event.preventDefault();

    // check if any of the input fields is empty
    if (!title || !date || !venue || !city) {
      alert('Please fill in all fields.');
      return;
    }

    // simulate posting event (replace with future API call)
    const newEvent = {
      id: events.length + 1, // assign a new ID based on current events length
      title,
      date,
      venue,
      city,
    };

    // update events array in parent component
    setEvents(prevEvents => [newEvent, ...prevEvents]);

    // clear form fields
    setTitle('');
    setDate(getCurrentDateTime()); // reset date to current time
    setVenue('');
    setCity('');

    
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className='form-title'>{TITLE}</div>
        <div className='input-container'>
          <div className='input-title'>TITLE</div>
          <input type='text' placeholder='Insert a title' id="title" name='title' value={title} onChange={handleTitleChange} />
        </div>
        <div className='input-container'>
          <div className='input-title'>DATE</div>
          <input type='datetime-local' id='date' value={date} onChange={handleDateChange} />
        </div>
        <div className='input-container'> 
          <div className='input-title'>VENUE</div>
          <input type='text' placeholder='Insert a venue' id="venue" name='venue' value={venue} onChange={handleVenueChange} />
        </div>
        <div className='input-container'> 
          <div className='input-title'>CITY</div>
          <input type='text' placeholder='Insert a city' id="city" name='city' value={city} onChange={handleCityChange} />
        </div>
        <button className='input-button'>Create</button>
      </form>
    </>
  )
}
