import React, { useReducer } from 'react';
import './EventForm.css';
import { getCurrentDateTime } from '../utils/getCurrentTime';
import { postEvent } from '../services/api-service';
import { BeatLoader } from 'react-spinners';

export default function EventForm({ setEvents, events, themeStyles, eventBackgroundStyles }) {

  const TITLE = 'Create a new event';

  const initialState = {
    title: '',
    date: getCurrentDateTime(),
    venue: '',
    city: '',
    isSubmitting: false,
    isLoading: false, // Loading state
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

  function handleChange(event) {
    const { name, value } = event.target;
    console.log(name)
    console.log(value)
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

    setTimeout(async () => {
      try {
        const newEvent = {
          title,
          date,
          venue,
          city,
        };

        console.log('New Event: ', newEvent)

        const response = await postEvent(newEvent);
        console.log('Event created:', response);

        // setEvents(prevEvents => [response, ...prevEvents]);
        // set new events sorted
        const updatedEvents = [response, ...events];
        updatedEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
        setEvents(updatedEvents);

        dispatch({ type: 'RESET_FORM' });
      } catch (error) {
        console.error('Failed to create event:', error);
        dispatch({ type: 'SET_ERROR', payload: 'Failed to create event. Please try again.' });
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    }, 3000); // simulated delay of 3 seconds
  }

  return (
    <>
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
          {state.isLoading ? <BeatLoader color={'rgba(255,255,255,1)'} loading={state.isLoading} size={10}/> : 'Create'}
        </button>
      </form>
    </>
  );
}




