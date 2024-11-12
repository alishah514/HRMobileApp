import {Platform, StyleSheet} from 'react-native';
import {Colors} from '../../components/common/Colors';
import {hp, wp} from '../../components/common/Dimensions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: Colors.blackColor,
  },
  curveView: {
    height: hp(30),
    alignItems: 'center',
    paddingBottom: wp('30'),
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  logoIcon: {width: wp('20'), height: wp('20')},
  rowTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: wp('5'),
  },
  boxViewTime: {
    width: wp('30'),
    height: wp('25'),
    borderRadius: wp('2'),
    backgroundColor: Colors.whiteColor,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: wp('0.15'),
    borderColor: Colors.greyColor,
  },
  boxView: {
    width: wp('35'),
    height: wp('45'),
    borderRadius: wp('5'),
    backgroundColor: Colors.whiteColor,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: wp('0.15'),
    borderColor: Colors.greyColor,
  },
  circleView: {
    width: wp('20'),
    height: wp('20'),
    borderRadius: wp('10'),
    borderWidth: wp('0.3'),
    alignItems: 'center',
    justifyContent: 'center',
  },

  infoStarting: {
    width: wp('85'),
    alignSelf: 'center',
    paddingVertical: wp('5'),
  },

  width80Center: {
    width: wp('85'),
    alignSelf: 'center',
  },
  lastTime: {
    color: Colors.greyColor,
    fontSize: wp('2.5'),
    paddingTop: wp('3'),
  },
});
export default styles;
