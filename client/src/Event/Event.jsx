import './Event.css';
import moment from 'moment';
import DeleteButton from '../DeleteEventButton/DeleteButton';
import EditButton from '../EditEventButton/EditButton';

export default function Event({ event, themeStyles, eventBackgroundStyles, editButtonStyle, deleteButtonStyle, onDelete, onEdit }) {
  return (
    <div key={event._id} className='event-container' style={themeStyles} >
      <h2 className='event-date' style={eventBackgroundStyles}>{moment(event.date).format('Do MMM')}</h2>
      <div className='event-content'>
        <h2 className='event-title'>{event.title}</h2>
        <div className='event-date-content'>{moment(event.date).format('h:mm a - MMMM Do, YYYY')}</div>
        <div className='event-place'>{event.venue}, {event.city}</div>
      </div>
      <div className='event-buttons'>
        <DeleteButton className='event-delete-btn' eventId={event._id} deleteStyle={deleteButtonStyle} onDelete={onDelete} />
        <EditButton className='event-edit-btn' eventId={event._id} editStyle={editButtonStyle} onEdit={onEdit} />
      </div>
    </div>
  )
}

