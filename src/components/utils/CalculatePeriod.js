import {Alert} from 'react-native';

export const CalculatePeriod = (fromDate, toDate) => {
  if (fromDate > toDate) {
    console.error('From date must be less than or equal to To date.');
    Alert.alert('Error', 'From date must be less than or equal to To date.');
    return null;
  }

  return Math.ceil((toDate - fromDate) / (1000 * 60 * 60 * 24)) + 1;
};
