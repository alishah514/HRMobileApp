import {StyleSheet} from 'react-native';
import {hp, wp} from '../../components/common/Dimensions';
import {Colors} from '../../components/common/Colors';

const styles = StyleSheet.create({
  marginPadding: {
    marginTop: hp(9),
    paddingLeft: wp(5),
    marginBottom: hp(1),
  },
  boxView: {
    width: wp('90'),
    borderRadius: wp(2),
    backgroundColor: Colors.whiteColor,
    marginTop: hp(2),
    alignSelf: 'center',
    padding: wp(4),
  },
});
export default styles;
