
import './App.css';
import { useState, useEffect } from 'react';
import { sample_data } from './assets/sample_data';
import Header from './Header/Header';
import EventForm from './EventForm/EventForm';
import NextEvent from './NextEvent/NextEvent';
import Event from './Event/Event';
// import { getEvents } from '../services/api-service'; // replace sample_data with future API call + adapt useEffect 


export default function App() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Sort sample_data by date in descending order
    const sortedEvents = [...sample_data].sort((a, b) => {
      return new Date(a.date) - new Date(b.date);
    });

    // Update state with sorted events
    setEvents(sortedEvents);
  }, []); // Dependency array is empty, so this effect runs only once after initial render


  // --- TESTING
  // Log the events array
  // console.log('All events:', events);

  // const slicedEvents = events.slice(1);

  // // Log the sliced events array
  // console.log('Sliced events (excluding first):', slicedEvents);
  // --- TESTING

  return (
    <div className="App">
      <Header />
      <main>
        { events.length > 0 && 
        <>
          <div className='list-container'>
            <NextEvent event={events[0]}/>
            {events.slice(1).map((event) => {
              // --- TESTING
              //console.log('Mapping event:', event);
              return <Event key={event.id} event={event} />
            })
              
            }
          </div>
        </>
        }
        <EventForm setEvents={setEvents} events={events} />
      </main>
    </div>
  );
}

