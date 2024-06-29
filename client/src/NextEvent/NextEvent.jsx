import React from 'react';
import './NextEvent.css';
import moment from 'moment';
import DeleteButton from '../DeleteEventButton/DeleteButton';
import EditButton from '../EditEventButton/EditButton';

export default function NextEvent({ event, themeStyles, editButtonStyle, deleteButtonStyle, onDelete, onEdit }) {

  const TITLE = 'NEXT EVENT'

  return (
    <div className='next-container always-white-text' style={themeStyles}>
      <div className='next-title'>
        <div className='next-text'>{TITLE}</div>
        <div>
          <DeleteButton eventId={event._id} deleteStyle={deleteButtonStyle} onDelete={onDelete} />
          <EditButton eventId={event._id} editStyle={editButtonStyle} onEdit={onEdit} />
        </div>
      </div>
      <div className='next-content'>
        <h2>{moment(event.date).format('Do MMM')}</h2>
        <h2>{event.title}</h2>
        <p>{moment(event.date).format('h:mm a - MMMM Do, YYYY')}</p>
        <p> {event.venue}, {event.city}</p>
      </div>
    </div>
  
  )
}

