import React, { useReducer, useEffect } from 'react';
import './EventForm.css';
import { getCurrentDateTime } from '../utils/getCurrentTime';
import { formatDate }from '../utils/formatDate'
import { postEvent, editEvent } from '../services/api-service';
import { BeatLoader } from 'react-spinners';

export default function EventForm({ setEvents, events, themeStyles, eventBackgroundStyles, eventToEdit, clearEventToEdit }) {
  const TITLE = eventToEdit ? 'Edit Event' : 'Create a new event';

  const initialState = {
    title: eventToEdit ? eventToEdit.title : '',
    date: eventToEdit ? formatDate(eventToEdit.date) : getCurrentDateTime(),
    venue: eventToEdit ? eventToEdit.venue : '',
    city: eventToEdit ? eventToEdit.city : '',
    isSubmitting: false,
    isLoading: false,
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
      case 'SET_SUBMITTING':
        return { ...state, isSubmitting: action.payload };
      case 'SET_LOADING':
        return { ...state, isLoading: action.payload };
      case 'RESET_FORM':
        return initialState;
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (eventToEdit) {
      dispatch({ type: 'SET_TITLE', payload: eventToEdit.title });
      dispatch({ type: 'SET_DATE', payload: formatDate(eventToEdit.date) });
      dispatch({ type: 'SET_VENUE', payload: eventToEdit.venue });
      dispatch({ type: 'SET_CITY', payload: eventToEdit.city });
    }
  }, [eventToEdit]);

  function handleChange(event) {
    const { name, value } = event.target;
    dispatch({ type: `SET_${name.toUpperCase()}`, payload: value });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const { title, date, venue, city } = state;

    if (!title || !date || !venue || !city) {
      alert('Please fill in all fields.');
      return;
    }

    dispatch({ type: 'SET_LOADING', payload: true });

    try {
      let response;
      if (eventToEdit) {
        // Editing an existing event
        response = await editEvent(eventToEdit._id, { title, date, venue, city });
        setEvents(prevEvents => prevEvents.map(event => event._id === eventToEdit._id ? response : event));
        clearEventToEdit();
      
      } else {
        // Creating a new event
        response = await postEvent({ title, date, venue, city });
        const updatedEvents = [response, ...events];
        updatedEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
        setEvents(updatedEvents);
      }
      dispatch({ type: 'RESET_FORM' });
    } catch (error) {
      console.error('Failed to submit event:', error);
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }

  return (
    <form onSubmit={handleSubmit} style={themeStyles} id='form' name='form'>
      <div className='form-title'>{TITLE}</div>
      <div className='input-container'>
        <div className='input-title'>TITLE</div>
        <input
          type='text'
          placeholder='Insert a title'
          id='title'
          name='title'
          value={state.title}
          onChange={handleChange}
          disabled={state.isLoading}
        />
      </div>
      <div className='input-container'>
        <div className='input-title'>DATE</div>
        <input
          type='datetime-local'
          id='date'
          name='date'
          value={state.date}
          onChange={handleChange}
          disabled={state.isLoading}
        />
      </div>
      <div className='input-container'>
        <div className='input-title'>VENUE</div>
        <input
          type='text'
          placeholder='Insert a venue'
          id='venue'
          name='venue'
          value={state.venue}
          onChange={handleChange}
          disabled={state.isLoading}
        />
      </div>
      <div className='input-container'>
        <div className='input-title'>CITY</div>
        <input
          type='text'
          placeholder='Insert a city'
          id='city'
          name='city'
          value={state.city}
          onChange={handleChange}
          disabled={state.isLoading}
        />
      </div>
      <button
        className='input-button'
        style={eventBackgroundStyles}
        disabled={state.isLoading}
      >
        {state.isLoading ? <BeatLoader color={'rgba(255,255,255,1)'} loading={state.isLoading} size={10}/> : eventToEdit ? 'Update' : 'Create'}
      </button>
    </form>
  );
}




