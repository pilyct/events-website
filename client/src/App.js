import './App.css';
import { useState, useEffect } from 'react';
import Header from './Header/Header';
import EventForm from './EventForm/EventForm';
import NextEvent from './NextEvent/NextEvent';
import Event from './Event/Event';
import { ThemeProvider, useTheme, useThemeUpdate } from './CustomAppTheme';
import { getEvents, deleteEvent } from './services/api-service';
import { PropagateLoader } from 'react-spinners';

function AppContent() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  const darkTheme = useTheme();
  const toggleTheme = useThemeUpdate();

  const themeStyles = {
    backgroundColor: darkTheme ? '#1f1f2f' : '#fff',
    color: darkTheme ? '#fff' : '#1f1f1f',
    boxShadow: darkTheme ? 'rgba(5, 5, 5, 0.9) 0px 2px 6px 2px' : 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
    fill: darkTheme ? '#fff' : '#1f1f1f',
  };

  const appBackgroundStyles = {
    backgroundColor: darkTheme ? '#111' : '#f1f1f1',
  };

  const eventBackgroundStyles = {
    backgroundColor: darkTheme ? '#6488ea' : '#1c1c1c',
  };

  useEffect(() => {
    setLoading(true);
    getEvents()
      .then(data => setEvents(data))
      .catch(error => alert(error.message))
      .finally(() => setLoading(false));
  }, []);

  
  const handleDeleteEvent = async (eventIdToDelete) => {
    console.log("Event ID to delete:", eventIdToDelete);
    const confirmed = window.confirm("Are you sure you want to delete this event?");
    
    if (!confirmed) {
      return;
    }

    setLoading(true);

    try {
      await deleteEvent(eventIdToDelete);
      const updatedEvents = events.filter(event => event._id !== eventIdToDelete);
      setEvents(updatedEvents);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App" style={{ ...themeStyles, ...appBackgroundStyles }}>
      {loading ? (
        <div className='spinner'>
          <PropagateLoader color={'rgba(100,136,234,1)'} loading={loading} size={30} aria-label="Loading Spinner" />
        </div>
      ) : (
        <>
          <Header themeStyles={themeStyles} toggleTheme={toggleTheme} />
          <main>
            {events.length > 0 && (
              <>
                <div className='list-container'>
                  <NextEvent event={events[0]} themeStyles={themeStyles} onDelete={() => handleDeleteEvent(events[0]._id)} />
                  {events.slice(1).map((event) => (
                    <Event
                      key={event._id}
                      event={event}
                      themeStyles={themeStyles}
                      eventBackgroundStyles={eventBackgroundStyles}
                      onDelete={() => handleDeleteEvent(event._id)}
                    />
                  ))}
                </div>
              </>
            )}
            <EventForm setEvents={setEvents} events={events} themeStyles={themeStyles} eventBackgroundStyles={eventBackgroundStyles} />
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



