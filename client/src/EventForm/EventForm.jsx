// EventForm.js
import React, { useRef, useEffect } from 'react';
import './EventForm.css';
import { BeatLoader } from 'react-spinners';
import { useEventForm } from '../Hooks/useEventForm';
import { postEvent, editEvent } from '../services/api-service';

export default function EventForm({ setEvents, events, themeStyles, eventBackgroundStyles, eventToEdit, clearEventToEdit }) {
  const { state, handleChange, resetForm, dispatch } = useEventForm(eventToEdit);
  const formRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (formRef.current && !formRef.current.contains(event.target)) {
        resetForm();
        clearEventToEdit();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [clearEventToEdit, resetForm]);
  

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
        response = await editEvent(eventToEdit._id, { title, date, venue, city });
        setEvents(prevEvents => prevEvents.map(event => event._id === eventToEdit._id ? response : event));
        clearEventToEdit();

      } else {
        response = await postEvent({ title, date, venue, city });
        const updatedEvents = [response, ...events];
        updatedEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
        setEvents(updatedEvents);
      }
      resetForm();

    } catch (error) {
      console.error('Failed to submit event:', error);
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} style={themeStyles} id='form' name='form'>
      <div className='form-title'>{eventToEdit ? 'Edit Event' : 'Create a new event'}</div>
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





