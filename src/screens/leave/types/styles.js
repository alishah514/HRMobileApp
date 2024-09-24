import {StyleSheet} from 'react-native';
import {Colors} from '../../../components/common/Colors';
import {wp} from '../../../components/common/Dimensions';

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
    marginBottom: wp('10'),
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
  rightContainer: {
    flex: 1,
  },
  type: {
    fontSize: wp('3.8'),
  },
  typeSmall: {
    fontSize: wp('3.5'),
  },
  title: {
    fontSize: wp('4'),
    fontWeight: '600',
    color: Colors.blackColor,
  },
  description: {
    fontSize: wp('3.5'),
    color: '#555',
    marginTop: wp('1'),
  },
  itemBox: {
    paddingHorizontal: wp('2'),
    paddingVertical: wp('1'),
    backgroundColor: Colors.whiteColor,
    borderWidth: wp('0.2'),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: wp('5'),
    marginBottom: wp('2'),
    alignSelf: 'flex-start',
  },
});
export default styles;
