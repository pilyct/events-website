import React, { useReducer } from 'react';
import './EventForm.css';
import { getCurrentDateTime } from '../utils/getCurrentTime';
// import { postEvent } from '../services/api-service';

export default function EventForm({ setEvents, events, themeStyles }) {

  const TITLE = 'Create a new event';


  const initialState = {
    title: '',
    date: getCurrentDateTime(),
    venue: '',
    city: '',
  };

  function reducer(state, action) {
    switch (action.type) {
      case 'SET_TITLE':
        return { ...state, title: action.payload };
      case 'SET_DATE':
        return { ...state, date: action.payload };
      case 'SET_VENUE':
        return { ...state, venue: action.payload };
      case 'SET_CITY':
        return { ...state, city: action.payload };
      case 'RESET_FORM':
        return initialState;
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  function handleChange(event) {
    const { name, value } = event.target;
    dispatch({ type: `SET_${name.toUpperCase()}`, payload: value });
  }

  function handleSubmit(event) {
    event.preventDefault();

    const { title, date, venue, city } = state;

    if (!title || !date || !venue || !city) {
      alert('Please fill in all fields.');
      return;
    }

    const newEvent = {
      id: events.length + 1,
      title,
      date,
      venue,
      city,
    };

    setEvents(prevEvents => [newEvent, ...prevEvents]);

    dispatch({ type: 'RESET_FORM' });
  }

  return (
    <>
      <form onSubmit={handleSubmit} style={themeStyles} id='form' name='form'>
        <div className='form-title'>{TITLE}</div>
        <div className='input-container'>
          <div className='input-title'>TITLE</div>
          <input type='text' placeholder='Insert a title' id='title' name='title' value={state.title} onChange={handleChange} />
        </div>
        <div className='input-container'>
          <div className='input-title'>DATE</div>
          <input type='datetime-local' id='date' name='date' value={state.date} onChange={handleChange} />
        </div>
        <div className='input-container'>
          <div className='input-title'>VENUE</div>
          <input type='text' placeholder='Insert a venue' id='venue' name='venue' value={state.venue} onChange={handleChange} />
        </div>
        <div className='input-container'>
          <div className='input-title'>CITY</div>
          <input type='text' placeholder='Insert a city' id='city' name='city' value={state.city} onChange={handleChange} />
        </div>
        <button className='input-button'>Create</button>
      </form>
    </>
  );
}

