export const sample_data = [
  {
    id: 0,
    title: 'Exoplanetary Exploration Expo',
    date: randomDate(new Date(), addYears(new Date(), 5)).toISOString(),
    venue: 'Space Research Center',
    city: 'Cosmic City',
  },
  {
    id: 1,
    title: 'Virtual Reality Innovation Summit',
    date: randomDate(new Date(), addYears(new Date(), 5)).toISOString(),
    venue: 'VR Tech Hub',
    city: 'Digital Metropolis',
  },
  {
    id: 2,
    title: 'Genetic Engineering Symposium',
    date: randomDate(new Date(), addYears(new Date(), 5)).toISOString(),
    venue: 'BioTech Tower',
    city: 'Gene City',
  },
  {
    id: 3,
    title: 'AeroSpace Technology Expo',
    date: randomDate(new Date(), addYears(new Date(), 5)).toISOString(),
    venue: 'SkyTech Arena',
    city: 'Skyline City',
  },
  {
    id: 4,
    title: 'Quantum Computing Conference',
    date: randomDate(new Date(), addYears(new Date(), 5)).toISOString(),
    venue: 'Quantum Labs',
    city: 'Quantum Valley',
  },
];

// Function to generate a random date between two dates
function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

// Function to add years to a date
function addYears(date, years) {
  const result = new Date(date);
  result.setFullYear(date.getFullYear() + years);
  return result;
}


  