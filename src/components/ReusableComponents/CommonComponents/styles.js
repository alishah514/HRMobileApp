import {StyleSheet} from 'react-native';
import {hp, wp} from '../../common/Dimensions';

const styles = StyleSheet.create({
  button: {
    marginVertical: wp('5'),
    width: wp('80'),
    height: hp('6'),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: wp('2'),
  },
});
export default styles;
