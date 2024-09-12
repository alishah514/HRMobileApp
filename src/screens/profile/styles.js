import {Platform, StyleSheet} from 'react-native';
import {hp, wp} from '../../components/common/Dimensions';
import {Colors} from '../../components/common/Colors';

const styles = StyleSheet.create({
  curveView: {
    height: hp('30'),
    alignItems: 'center',
    paddingBottom: wp('30'),
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  logoIcon: {width: wp('15'), height: wp('15'), marginRight: wp('3')},
  imageCircle: {
    width: wp('30'),
    height: wp('30'),
    borderRadius: wp('15'),
    backgroundColor: Colors.whiteColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageView: {
    width: '100%',
    height: '100%',
    borderRadius: wp('15'),
  },
  editPenIconCircle: {
    width: wp('10'),
    height: wp('10'),
    borderRadius: wp('5'),
    backgroundColor: Colors.yellowColor,
    position: 'absolute',
    top: -5,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  tabChange: {
    width: wp('85'),
    height: wp('20'),
    borderRadius: wp('10'),
    justifyContent: 'space-between',
    backgroundColor: Colors.whiteColor,
    alignSelf: 'center',
    position: 'absolute',
    top: Platform.OS === 'ios' ? -30 : -20,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: wp('7'),
    zIndex: 1,
  },
  activeTabIconCircle: {
    width: wp('14'),
    height: wp('14'),
    borderRadius: wp('7'),
    backgroundColor: Colors.yellowColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nonActiveTabIconCircle: {
    width: wp('14'),
    height: wp('14'),
    borderRadius: wp('7'),
    backgroundColor: Colors.whiteColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoStarting: {
    width: wp('85'),
    paddingTop: wp('15'),
    flexGrow: 1,
    alignSelf: 'center',
  },
  maxHeight: {maxHeight: Platform.OS === 'ios' ? hp('42') : hp('47')},
});
export default styles;
