
const Event = require('./eventModel');
const fs = require('fs');

const sample_data = JSON.parse(fs.readFileSync('../assets/sample_data.json', 'utf-8'));

const insertSampleData = async () => {
  try {
    await Event.create(sample_data)
    console.log('🌱 Data successfully imported to Mongo Atlas! 🌱');
    // to exit the process
    process.exit();
  } catch (error) {
    console.log('error', error);
  }
}

// Run only once at the beginning to generate some fake data
// insertSampleData(); 