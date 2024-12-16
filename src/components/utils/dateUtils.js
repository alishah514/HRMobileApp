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
  if (!dateStr) return null;

  // If dateStr is a Date object, no need to call trim
  if (dateStr instanceof Date) {
    return dateStr.toISOString();
  }

  // Normalize the date string only if it is a string
  if (typeof dateStr === 'string') {
    dateStr = dateStr.trim();
  }

  // Check if the date is in DD-MM-YYYY format
  const isValidDDMMYYYY = /^\d{1,2}-\d{1,2}-\d{4}$/.test(dateStr);

  if (isValidDDMMYYYY) {
    const [day, month, year] = dateStr.split('-').map(Number);

    // Validate the ranges for day and month
    if (month < 1 || month > 12) {
      console.error('Invalid month:', month);
      return null;
    }

    const daysInMonth = new Date(year, month, 0).getDate(); // Last day of the month
    if (day < 1 || day > daysInMonth) {
      console.error('Invalid day:', day);
      return null;
    }

    // Force the date to midnight UTC
    const utcDate = new Date(Date.UTC(year, month - 1, day));
    return utcDate.toISOString();
  } else {
    // Handle other formats or directly parse
    const parsedDate = new Date(dateStr);
    if (isNaN(parsedDate.getTime())) {
      console.error('Failed to create date from:', dateStr);
      return null;
    }

    // Ensure we return the UTC version of the date
    const utcDate = new Date(
      Date.UTC(
        parsedDate.getFullYear(),
        parsedDate.getMonth(),
        parsedDate.getDate(),
      ),
    );
    return utcDate.toISOString();
  }
};
