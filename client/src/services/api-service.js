
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
    const response = await fetch(`${URL}/events/add`, {
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
    console.log('Client Service Data Response: ', data)
    return data;
  } catch (e) {
    console.error(e);
    throw e; 
  }
}


// DELETE
async function deleteEvent(eventId) {
  try {
    // console.log('eventId: ', eventId)
    const response = await fetch(`${URL}/events/${eventId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // console.log('Response Status: ', response.status);
    // console.log('Response Headers: ', response.headers);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response: ', errorText);
      throw new Error(`Failed to delete the event: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log(data.message);
    console.log(data);
    return data;
  } catch (e) {
    console.error('Caught Error: ', e);
    throw e; 
  }

}


// UPDATE
async function editEvent(eventId, event) {
  try {
    // console.log('eventId: ', eventId)
    const response = await fetch(`${URL}/events/edit/${eventId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event)
    });
  
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data.message);
    console.log(data);
    return data;
  } catch (e) {
    console.error('Caught Error: ', e);
    throw e; 
  }

}


module.exports = { getEvents, postEvent, deleteEvent, editEvent };