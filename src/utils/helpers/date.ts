export const getDay = (dateString: string): string => {
  // API returns dates in format YYYY-MM-DD
  const [year, month, day] = dateString.split('-').map(Number);
  const date = new Date(year, month - 1, day); // month is 0-indexed in Date constructor
  return date.toLocaleDateString('en-US', { weekday: 'long' });
};
