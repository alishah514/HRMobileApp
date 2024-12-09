import {StyleSheet} from 'react-native';
import {wp} from '../../components/common/Dimensions';
import {Colors} from '../../components/common/Colors';

const styles = StyleSheet.create({
  card: {
    width: wp(25),
    height: wp(30),
    borderRadius: wp(2),
    backgroundColor: Colors.whiteColor,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
    borderColor: Colors.blackColor,
    margin: wp(1),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: wp(0.1),
  },

  name: {
    fontSize: wp(3.5),
    fontWeight: '500',
    color: Colors.blackColor,
    textAlign: 'center',
    paddingTop: wp(4),
  },
  id: {
    fontSize: wp(3),
    color: Colors.blackColor,
    textAlign: 'center',
    paddingTop: wp(2),
  },
  statusIndicator: {
    width: wp(4),
    height: wp(4),
    borderRadius: wp(2),
    position: 'absolute',
    top: 0,
    right: 0,
  },
  image: {
    width: wp('11'),
    height: wp('11'),
    borderRadius: wp('11') / 2,
  },
});
export default styles;
