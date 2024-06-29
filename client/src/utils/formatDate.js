export function formatDate(date) {
  const d = new Date(date);
  const pad = num => num.toString().padStart(2, '0');

  const yyyy = d.getFullYear();
  const MM = pad(d.getMonth() + 1);
  const dd = pad(d.getDate());
  const hh = pad(d.getHours());
  const mm = pad(d.getMinutes());

  return `${yyyy}-${MM}-${dd}T${hh}:${mm}`;
}

