import React from 'react';
import './NextEvent.css';
import moment from 'moment';

export default function NextEvent({ event, themeStyles }) {

  const TITLE = 'NEXT EVENT'

  return (
    <div className='next-container always-white-text' style={themeStyles}>
      <h5 className='next-title'>{TITLE}</h5>
      <div className='next-content'>
        <h2>{moment(event.date).format('Do MMM')}</h2>
        <h2>{event.title}</h2>
        <p>{moment(event.date).format('h:mm a - MMMM Do, YYYY')}</p>
        <p> {event.venue}, {event.city}</p>
      </div>
    </div>
  
  )
}

