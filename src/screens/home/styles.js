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
  logoIcon: {width: wp('15'), height: wp('15'), marginRight: wp('3')},
  rowTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: wp('30'),
  },
  boxView: {
    width: wp('35'),
    height: wp('45'),
    borderRadius: wp('5'),
    backgroundColor: Colors.whiteColor,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleView: {
    width: wp('20'),
    height: wp('20'),
    borderRadius: wp('10'),
    borderWidth: wp('0.3'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  firstView: {top: wp('-30'), left: wp('10')},
  secondView: {top: wp('-15'), right: wp('10')},
  thirdView: {top: wp('25'), left: wp('10')},
  fourthView: {top: wp('40'), right: wp('10')},
});
export default styles;
