import {StyleSheet} from 'react-native';
import {wp} from '../../../components/common/Dimensions';
import {Colors} from '../../../components/common/Colors';

const styles = StyleSheet.create({
  logoImage: {
    width: wp('90'),
    height: wp('20'),
  },
  container: {
    flex: 1,
    backgroundColor: Colors.whiteColor,
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: wp('15'),
  },
  logoContainer: {
    alignItems: 'center',
  },

  loaderWrapper: {
    marginVertical: wp(15),
    alignSelf: 'center',
    backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loaderWrapperSmall: {
    height: wp('21.5'),
    width: wp('21.5'),
    borderRadius: wp('11'),

    backgroundColor: Colors.whiteColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomSpace: {
    flex: 1,
  },
});
export default styles;
