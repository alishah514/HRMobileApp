import Share from 'react-native-share';
import {Alert} from 'react-native';

export const shareFile = async shareOptions => {
  try {
    await Share.open(shareOptions);
  } catch (error) {
    if (error.message !== 'User did not share') {
      console.error('Error sharing file:', error);
      Alert.alert(
        'An error occurred while sharing the file. Please try again.',
      );
    }
  }
};
