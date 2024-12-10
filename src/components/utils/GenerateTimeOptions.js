export const GenerateTimeOptions = (startTime = 6, endTime = 5) => {
  const timeOptions = [];

  // Loop to generate time options
  for (let i = startTime; i <= 24 + endTime; i++) {
    const hour = i % 24; // Wrap around after 24 hours
    const period = hour < 12 ? 'AM' : 'PM';
    const formattedHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;

    const timeString = `${formattedHour}:00 ${period}`;
    timeOptions.push(timeString);
  }

  return timeOptions;
};
