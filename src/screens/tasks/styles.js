import {StyleSheet} from 'react-native';
import {wp} from '../../components/common/Dimensions';
import {Colors} from '../../components/common/Colors';

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
    marginBottom: wp('5'),
  },
  leftContainer: {
    alignItems: 'center',
    marginRight: wp('2.5'),
    position: 'relative',
  },
  dot: {
    marginTop: wp('1.5'),
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
  boxRecord: {
    width: wp('70'),
    height: wp('20'),
    backgroundColor: Colors.whiteColor,
    borderRadius: wp('10'),
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: wp('5'),
    marginTop: wp('5'),
  },
  taskBox: {
    width: wp('2.5'),
    height: wp('2.5'),
  },
});
export default styles;
