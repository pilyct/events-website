export function getCurrentDateTime() {
  const now = new Date();
  const pad = num => num.toString().padStart(2, '0');

  const yyyy = now.getFullYear();
  const MM = pad(now.getMonth() + 1);
  const dd = pad(now.getDate());
  const hh = pad(now.getHours());
  const mm = pad(now.getMinutes());

  return `${yyyy}-${MM}-${dd}T${hh}:${mm}`;
}
// // Function to format the current date and time in the required format for datetime-local input
// export const getCurrentDateTime = () => {
//   const now = new Date();
//   // Format the date to YYYY-MM-DDThh:mm (required format for datetime-local)
//   const year = now.getFullYear();
//   const month = `${now.getMonth() + 1}`.padStart(2, '0');
//   const day = `${now.getDate()}`.padStart(2, '0');
//   const hour = `${now.getHours()}`.padStart(2, '0');
//   const minutes = `${now.getMinutes()}`.padStart(2, '0');

//   return `${year}-${month}-${day}T${hour}:${minutes}`;
// };

