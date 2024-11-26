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

  infoStarting: {
    width: wp('85'),
    alignSelf: 'center',
  },
  maxHeight: {
    maxHeight: Platform.OS === 'ios' ? hp('47') : hp('53'),
    marginTop: wp('15'),
  },
  paddingBottom5Align: {
    paddingBottom: wp('5'),
    alignItems: 'center',
  },

  // numeric salary
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    width: 100,
  },
  input: {
    flex: 1,
    height: 40,
    textAlign: 'center',
    borderColor: '#ccc',
    fontSize: 18,
  },
  buttonContainer: {
    justifyContent: 'center',
  },
  arrowButton: {
    width: 40,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowText: {
    fontSize: 18,
  },

  dpView: {
    width: wp(15),
    height: wp(15),
    backgroundColor: Colors.whiteColor,
    borderRadius: wp(7.5),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.greyColor,
  },
  card: {
    height: wp(60),
    width: wp(95),
    alignSelf: 'center',
    borderRadius: wp(3),
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.greyColor,
    margin: wp(7),
    padding: wp(5),
    backgroundColor: Colors.whiteColor,
  },
  logo: {
    width: wp(50),
    height: wp(10),
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  details: {
    justifyContent: 'center',
    width: wp('60'),
  },
  label: {
    fontSize: wp(4),
    color: '#555',
    marginTop: wp(3),
  },
  value: {
    fontSize: wp(4.5),
    fontWeight: '600',
    color: '#222',
  },
  iconContainer: {
    justifyContent: 'center',
    height: wp(30),

    marginTop: wp(5),
  },
  viewShotStyle: {
    flex: 1,
    width: wp(95),
    alignSelf: 'center',
  },
});
export default styles;
