import './Event.css';
import moment from 'moment';
import DeleteButton from '../DeleteEventButton/DeleteButton';

export default function Event({ event, themeStyles, eventBackgroundStyles, onDelete }) {
  return (
    <div key={event._id} className='event-container' style={themeStyles} >
      <h2 className='event-date' style={eventBackgroundStyles}>{moment(event.date).format('Do MMM')}</h2>
      <div className='event-content'>
        <h2 className='event-title'>{event.title}</h2>
        <div className='event-date-content'>{moment(event.date).format('h:mm a - MMMM Do, YYYY')}</div>
        <div className='event-place'>{event.venue}, {event.city}</div>
      </div>
      <div className='event-delete-btn'>
        <DeleteButton eventId={event._id} style={themeStyles} onDelete={onDelete} />
      </div>
    </div>
  )
}

