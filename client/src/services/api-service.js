
const URL = 'http://localhost:3000'; 

// GET
async function getEvents() {
  try {
    const response = await fetch(`${URL}/events`); // we fetch data
    const data= await response.json(); // we format it
    return data; // and we return it
  } catch (e) {
    console.log(e);
    throw e; 
  }
}



// POST
async function postEvent(event) {
  try {
    const response = await fetch(`${URL}/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(event)
    })
    // console.log('Client Service Response: ', response)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    // console.log('Client Service Data Response: ', data)
    return data;
  } catch (e) {
    console.error(e);
    throw e; 
  }
}

module.exports = { getEvents, postEvent };

// WITH SAMPLE_DATA
// import { sample_data } from '../assets/sample_data';

// // GET
// async function getEvents() {
//   try {
//     return sample_data;
//   } catch (e) {
//     console.log(e);
//   }
// }

// // POST
// async function postEvent(title, date, venue, city) {
//   try {
//     // Create a new event object
//     const newEvent = { title, date, venue, city };
    
//     // Add the new event to the sample data array
//     sample_data.push(newEvent);
    
//     // Return the new event
//     return newEvent;
//   } catch (e) {
//     console.log(e);
//   }
// }

// export { getEvents, postEvent };