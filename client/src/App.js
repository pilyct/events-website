import './App.css';
import { useState, useEffect } from 'react';
import Header from './Header/Header';
import EventForm from './EventForm/EventForm';
import NextEvent from './NextEvent/NextEvent';
import Event from './Event/Event';
import { ThemeProvider, useTheme, useThemeUpdate } from './CustomAppTheme';
import { getEvents, deleteEvent } from './services/api-service';
import { PropagateLoader } from 'react-spinners';
import { themeStyles, appBackgroundStyles, eventBackgroundStyles, deleteButtonStyle, editButtonStyle, bannerStyles } from './Styles';

function AppContent() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [eventToEdit, setEventToEdit] = useState(null);

  const darkTheme = useTheme();
  const toggleTheme = useThemeUpdate();

  useEffect(() => {
    setLoading(true);
    getEvents()
      .then(data => setEvents(data))
      .catch(error => alert(error.message))
      .finally(() => setLoading(false));
  }, []);

  const handleDeleteEvent = async (eventIdToDelete) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;

    setLoading(true);
    try {
      await deleteEvent(eventIdToDelete);
      setEvents(events.filter(event => event._id !== eventIdToDelete));
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEditEvent = (eventIdToEdit) => {
    const event = events.find(event => event._id === eventIdToEdit);
    if (event) setEventToEdit(event);
  };

  const clearEventToEdit = () => setEventToEdit(null);

  const renderEvents = () => (
    <>
      <NextEvent
        event={events[0]}
        themeStyles={themeStyles(darkTheme)}
        editButtonStyle={editButtonStyle(darkTheme)}
        deleteButtonStyle={deleteButtonStyle(darkTheme)}
        onDelete={() => handleDeleteEvent(events[0]._id)}
        onEdit={() => handleEditEvent(events[0]._id)}
      />
      {events.slice(1).map(event => (
        <Event
          key={event._id}
          event={event}
          themeStyles={themeStyles(darkTheme)}
          eventBackgroundStyles={eventBackgroundStyles(darkTheme)}
          editButtonStyle={editButtonStyle(darkTheme)}
          deleteButtonStyle={deleteButtonStyle(darkTheme)}
          onDelete={() => handleDeleteEvent(event._id)}
          onEdit={() => handleEditEvent(event._id)}
        />
      ))}
    </>
  );

  return (
    <div className="App" style={{ ...themeStyles(darkTheme), ...appBackgroundStyles(darkTheme) }}>
      {loading ? (
        <div className="spinner">
          <PropagateLoader color={'rgba(100,136,234,1)'} loading={loading} size={30} aria-label="Loading Spinner" />
        </div>
      ) : (
        <>
          <Header themeStyles={themeStyles(darkTheme)} toggleTheme={toggleTheme} />
          <div className='sliding-banner' style={bannerStyles(darkTheme)}>
            <div className='sliding-banner-content'> 
            ⋆✺ Hola Caracola - Du siehst toll aus! ✺⋆  
            </div>
          </div>
          <main>
            {events.length > 0 && <div className="list-container">{renderEvents()}</div>}
            <EventForm
              setEvents={setEvents}
              events={events}
              themeStyles={themeStyles(darkTheme)}
              eventBackgroundStyles={eventBackgroundStyles(darkTheme)}
              eventToEdit={eventToEdit}
              clearEventToEdit={clearEventToEdit}
            />
          </main>
        </>
      )}
    </div>
  );
}




export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}



