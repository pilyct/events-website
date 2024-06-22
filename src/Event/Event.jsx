import React from 'react';
import './Event.css';
import moment from 'moment';

export default function Event({ event }) {
  return (
    <div key={event.id} className='event-container' >
      <h2 className='event-date'>{moment(event.date).format('Do MMM')}</h2>
      <div className='event-content'>
        <h2 className='event-title'>{event.title}</h2>
        <div className='event-date-content'>{moment(event.date).format('h:mm a - MMMM Do, YYYY')}</div>
        <div className='event-place'>{event.venue}, {event.city}</div>
      </div>
    </div>
  )
}

