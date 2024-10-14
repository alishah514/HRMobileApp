export const CalculatePeriod = (fromDate, toDate) => {
  console.log('CalculatePeriod', fromDate, toDate);
  if (fromDate > toDate) {
    console.error('From date must be less than or equal to To date.');
    return null;
  }

  return Math.ceil((toDate - fromDate) / (1000 * 60 * 60 * 24)) + 1;
};
