import './App.css';
import { useState, useEffect } from 'react';
import { sample_data } from './assets/sample_data';
import Header from './Header/Header';
import EventForm from './EventForm/EventForm';
import NextEvent from './NextEvent/NextEvent';
import Event from './Event/Event';
import { ThemeProvider, useTheme, useThemeUpdate } from './CustomAppTheme';
// import { getEvents } from '../services/api-service'; // replace sample_data with future API call + adapt useEffect 

function AppContent() {
  const [events, setEvents] = useState([]);
  const darkTheme = useTheme();
  const toggleTheme = useThemeUpdate();
  const themeStyles = {
    backgroundColor: darkTheme ? '#1f1f2f' : '#fff',
    color: darkTheme ? '#fff' : '#1f1f1f',
    // border: `2px solid ${darkTheme ? 'red' : 'blue'}`,
    boxShadow:  darkTheme ? 'rgba(5, 5, 5, 0.9) 0px 2px 6px 2px' : 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
    fill: darkTheme ? '#fff' : '#1f1f1f',
  };

  // ONLY for App 
  const appBackgroundStyles = {
    backgroundColor: darkTheme ? '#111' : '#f1f1f1',
    
  };

  // ONLY for Event and EventForm
  const eventBackgroundStyles = {
    backgroundColor: darkTheme ? '#6488ea' : '#1c1c1c',
    
  };

  useEffect(() => {
    // Sort sample_data by date in ascending order
    const sortedEvents = [...sample_data].sort((a, b) => {
      return new Date(a.date) - new Date(b.date);
    });

    // Update state with sorted events
    setEvents(sortedEvents);
  }, []); // Dependency array is empty, so this effect runs only once after initial render

  return (
    <div className="App" style={{ ...themeStyles, ...appBackgroundStyles }}>
      <Header themeStyles={themeStyles} toggleTheme={toggleTheme} />
      {/* <button className='theme-button' onClick={toggleTheme}>Toggle Theme</button> */}
      <main>
        {events.length > 0 &&
          <>
            <div className='list-container'>
              <NextEvent event={events[0]} themeStyles={themeStyles} />
              {events.slice(1).map((event) => {
                return <Event key={event.id} event={event} themeStyles={themeStyles} eventBackgroundStyles={eventBackgroundStyles} />
              })}
            </div>
          </>
        }
        <EventForm setEvents={setEvents} events={events} themeStyles={themeStyles} eventBackgroundStyles={eventBackgroundStyles} />
      </main>
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

