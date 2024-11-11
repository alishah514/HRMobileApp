import moment from 'moment';

export const convertTime = timeInput => {
  if (!timeInput) {
    return '';
  }

  if (moment(timeInput, moment.ISO_8601, true).isValid()) {
    return moment(timeInput).format('HH:mm:ss');
  }

  let cleanedTime = timeInput.replace(/at|UTC.*$/, '').trim();

  const time = moment(cleanedTime, 'MMMM D, YYYY h:mm:ss A');

  if (!time.isValid()) {
    return '';
  }

  return time.format('HH:mm:ss');
};
