import {StyleSheet} from 'react-native';
import {wp} from '../../../../components/common/Dimensions';
import {Colors} from '../../../../components/common/Colors';

const styles = StyleSheet.create({
  verticalLine: {
    position: 'absolute',
    left: wp('1.5'),
    top: wp('1'),
    bottom: 0,
    width: 2,
    backgroundColor: Colors.lightGrey,
    zIndex: 0,
  },
  itemContainer: {
    flexDirection: 'row',
    marginBottom: wp('4'),
  },
  leftContainer: {
    alignItems: 'center',
    marginRight: wp('2.5'),
    position: 'relative',
  },
  dot: {
    marginTop: wp('1'),
    width: wp('3'),
    height: wp('3'),
    borderRadius: wp('2'),
    backgroundColor: Colors.yellowColor,
    zIndex: 2,
  },

  rightContainer: {
    flex: 1,
    minHeight: wp('18'),
  },
  year: {
    fontSize: wp('4.3'),
    fontWeight: 'bold',
    marginBottom: wp('1'),
    color: Colors.blackColor,
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
});
export default styles;
