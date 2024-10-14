/**
 * Function to convert timestamp to a formatted date (DD-MM-YYYY)
 * @param {string} timestamp - ISO timestamp string
 * @returns {string} - Formatted date string (DD-MM-YYYY)
 */
export const formatDate = timestamp => {
  if (!timestamp) return '';

  const date = new Date(timestamp);

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based in JS
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
};

/**
 * Function to convert a date string in DD-MM-YYYY format to a timestamp
 * @param {string} dateStr - Date string in DD-MM-YYYY format
 * @returns {string} - ISO timestamp string
 */
export const convertToTimestamp = dateStr => {
  console.log('dateStr:', dateStr);
  if (!dateStr) return null;

  // Normalize the date string to avoid leading/trailing spaces
  dateStr = dateStr.trim();

  // Check if the date is already in the expected format (DD-MM-YYYY)
  const isValidDDMMYYYY = /^\d{1,2}-\d{1,2}-\d{4}$/.test(dateStr);

  if (isValidDDMMYYYY) {
    // Split the input string and ensure the result has 3 parts
    const parts = dateStr.split('-').map(Number);
    if (parts.length !== 3) {
      console.error('Invalid date format. Expected DD-MM-YYYY');
      return null;
    }

    const [day, month, year] = parts;

    // Validate month and day ranges
    if (month < 1 || month > 12) {
      console.error('Invalid month:', month);
      return null;
    }

    // Check for days in the month (basic validation)
    const daysInMonth = new Date(year, month, 0).getDate(); // 0 gets the last day of the previous month
    if (day < 1 || day > daysInMonth) {
      console.error('Invalid day:', day);
      return null;
    }

    // Create a date object using UTC to avoid timezone issues
    const date = new Date(Date.UTC(year, month - 1, day));
    return date.toISOString(); // Return as an ISO string
  } else {
    // Try to parse date in other formats (like "Sun Oct 20 2024")
    const parsedDate = new Date(dateStr);
    if (isNaN(parsedDate.getTime())) {
      console.error('Failed to create date from:', dateStr);
      return null;
    }
    return parsedDate.toISOString(); // Return as an ISO string
  }
};
