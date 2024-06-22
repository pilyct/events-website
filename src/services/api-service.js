
// const URL = 'http://localhost:3000'; // It's not working - issue in the router and eventController

// // GET
// async function getEvents() {
//   try {
//     const data = await fetch(`${URL}/events`); // we fetch data
//     const response = await data.json(); // we format it
//     return response; // and we return it
//   } catch (e) {
//     console.log(e);
//   }
// }

// // POST
// async function postEvent(title, date, venue) {
//   try {
//     const data = await fetch(`${URL}/events`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({title, date, venue})
//     })
//     const response = await data.json();
//     return response;
//   } catch (e) {
//     console.log(e);
//   }
// }

// WITH SAMPLE_DATA
import { sample_data } from '../assets/sample_data';

// GET
async function getEvents() {
  try {
    return sample_data;
  } catch (e) {
    console.log(e);
  }
}

// POST
async function postEvent(title, date, venue, city) {
  try {
    // Create a new event object
    const newEvent = { title, date, venue, city };
    
    // Add the new event to the sample data array
    sample_data.push(newEvent);
    
    // Return the new event
    return newEvent;
  } catch (e) {
    console.log(e);
  }
}

export { getEvents, postEvent };
//module.exports = { getEvents, postEvent };