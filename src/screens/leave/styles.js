import {Platform, StyleSheet} from 'react-native';
import {hp, wp} from '../../components/common/Dimensions';

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
});
export default styles;
