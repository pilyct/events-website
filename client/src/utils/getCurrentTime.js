// Function to format the current date and time in the required format for datetime-local input
export const getCurrentDateTime = () => {
  const now = new Date();
  // Format the date to YYYY-MM-DDThh:mm (required format for datetime-local)
  const year = now.getFullYear();
  const month = `${now.getMonth() + 1}`.padStart(2, '0');
  const day = `${now.getDate()}`.padStart(2, '0');
  const hour = `${now.getHours()}`.padStart(2, '0');
  const minutes = `${now.getMinutes()}`.padStart(2, '0');

  return `${year}-${month}-${day}T${hour}:${minutes}`;
};