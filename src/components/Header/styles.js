import {StyleSheet} from 'react-native';
import {Colors} from '../common/Colors';
import {hp, wp} from '../common/Dimensions';

const styles = StyleSheet.create({
  whiteScreenView: {
    backgroundColor: Colors.whiteColor,
    borderBottomWidth: 2,
    borderBottomColor: 'rgba(0, 0, 0, 0.2)',
  },
  blueScreenView: {
    backgroundColor: Colors.blueColor,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGrey,
  },
  mainHeader: {
    flexDirection: 'row',
    height: hp(7),
    alignItems: 'center',
  },
  backView: {
    width: wp(10),
    alignItems: 'flex-end',
  },

  eachView: {width: wp(30), paddingLeft: wp(5)},
  thirdView: {width: wp(30), alignItems: 'flex-end', paddingRight: wp(5)},
  titleContainer: {
    paddingLeft: wp(10),
  },
  titleCenter: {
    alignItems: 'center',
    width: '100%',
  },

  titleText: {
    color: Colors.whiteColor,
    fontSize: wp(5.5),
    fontWeight: '500',
  },
  header80View: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: wp(5),
    width: wp(80),
  },
  headerFullView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(5),
    width: wp(100),
  },
  paddingRight10: {paddingRight: wp(10)},
  headerRight2Views: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});
export default styles;
