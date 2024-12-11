export const convertTo24HourFormat = time => {
  const [hourPart, period] = time.split(' ');
  const hour = parseInt(hourPart.split(':')[0], 10);

  if (period === 'AM') {
    return hour === 12 ? 0 : hour;
  } else if (period === 'PM') {
    return hour === 12 ? 12 : hour + 12;
  }
  return hour;
};

export const convertTo12HourFormat = time => {
  const period = time >= 12 ? 'PM' : 'AM';
  let adjustedTime = time % 12;

  if (adjustedTime === 0) {
    adjustedTime = 12;
  }

  return `${adjustedTime}:00 ${period}`;
};
