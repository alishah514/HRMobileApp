import {Dimensions, Platform, StatusBar} from 'react-native';

// Get screen dimensions
const {width, height} = Dimensions.get('window');

// Calculate width as a percentage of the screen width
export const wp = percentage => {
  return (percentage * width) / 100;
};

// Calculate height as a percentage of the screen height (accounting for iOS/Android status bars if needed)
export const hp = percentage => {
  const screenHeight = height;

  // Adjust height based on platform
  if (Platform.OS === 'android') {
    return (percentage * (screenHeight - StatusBar.currentHeight)) / 100;
  }
  return (percentage * screenHeight) / 100;
};

export default {
  screenWidth: width,
  screenHeight: height,
  wp,
  hp,
};
