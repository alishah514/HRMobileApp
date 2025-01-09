import {Platform, StyleSheet} from 'react-native';
import {hp, wp} from '../../components/common/Dimensions';
import {Colors} from '../../components/common/Colors';

const styles = StyleSheet.create({
  marginPadding: {
    marginTop: hp(4),
    paddingLeft: wp(5),
    marginBottom: hp(1),
  },
  boxView: {
    width: wp('90'),
    borderRadius: wp(2),
    backgroundColor: Colors.whiteColor,
    marginVertical: hp(1),
    alignSelf: 'center',
    padding: wp(4),
  },
  documentButton: {
    minWidth: wp('33'),
    maxWidth: wp('35'),

    height: wp('10'),
    backgroundColor: Colors.whiteColor,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: wp(2),
    borderWidth: wp(0.1),
    borderColor: Colors.greyColor,
  },
  flatListStyle: {
    maxHeight: Platform.OS === 'ios' ? hp('70') : hp('77'),
    marginTop: wp('4'),
  },
});
export default styles;
