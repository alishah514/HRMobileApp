import {StyleSheet} from 'react-native';
import {Colors} from '../../../components/common/Colors';
import {hp, wp} from '../../../components/common/Dimensions';

const styles = StyleSheet.create({
  verticalLine: {
    position: 'absolute',
    left: wp('1.5'),
    top: wp('2'),
    bottom: 0,
    width: 2,
    backgroundColor: Colors.lightGrey,
    zIndex: 0,
  },
  itemContainer: {
    flexDirection: 'row',
    marginBottom: wp('7'),
    alignItems: 'center',
  },
  leftContainer: {
    alignItems: 'center',
    marginRight: wp('2.5'),
    position: 'relative',
  },
  dot: {
    marginTop: wp('2'),
    width: wp('3'),
    height: wp('3'),
    borderRadius: wp('2'),
    zIndex: 2,
  },
  screenBox: {
    height: hp('8'),
    width: wp('80'),
    backgroundColor: Colors.whiteColor,
    borderRadius: wp('10'),
    justifyContent: 'center',
    marginTop: wp('2'),
  },
  upperPadding: {
    paddingTop: wp('5'),
    marginBottom: wp('30'),
  },
});
export default styles;
