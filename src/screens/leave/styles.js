import {Platform, StyleSheet} from 'react-native';
import {hp, wp} from '../../components/common/Dimensions';
import {Colors} from '../../components/common/Colors';

const styles = StyleSheet.create({
  maxHeight: {
    maxHeight: Platform.OS === 'ios' ? hp('47') : hp('53'),
    marginTop: wp('15'),
  },
  infoStarting: {
    width: wp('85'),
    alignSelf: 'center',
  },
  paddingBottom5Align: {
    paddingBottom: wp('5'),
    alignItems: 'center',
  },
  documentButton: {
    minWidth: wp('30'),
    maxWidth: wp('35'),

    height: wp('10'),
    backgroundColor: Colors.whiteColor,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: wp(2),
    borderWidth: wp(0.1),
    borderColor: Colors.greyColor,
  },
});
export default styles;
