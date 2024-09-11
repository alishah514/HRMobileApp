import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

export const wp = percentage => {
  const screenWidth = Dimensions.get('window').width;
  return (percentage * screenWidth) / 100;
};

export const hp = percentage => {
  const screenHeight = Dimensions.get('window').height;
  return (percentage * screenHeight) / 100;
};

export default {
  screenWidth: width,
  screenHeight: height,
  wp,
  hp,
};
