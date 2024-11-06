import moment from 'moment';

export const convertTime = timeString => {
  const time = moment(timeString, 'MMMM D, YYYY [at] h:mm:ss A [UTC]Z');

  return time.format('HH:mm:ss');
};
