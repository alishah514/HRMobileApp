import {Platform, StyleSheet} from 'react-native';
import {Colors} from '../../components/common/Colors';
import {wp} from '../../components/common/Dimensions';

const styles = StyleSheet.create({
  fullscreenImage: {
    width: '100%',
    height: '100%',
  },
  backgroundBlur: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    position: 'absolute',
    flex: 1,
    width: '100%',
    height: '100%',
    alignSelf: 'center',
  },
  buttonStyle: {
    marginTop: wp('5'),
    backgroundColor: Colors.blueColor,
    width: wp('80'),
    height: wp('12'),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: wp('1'),
  },
  loginTitle: {paddingBottom: wp('10'), alignSelf: 'center'},
  lineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: wp('8'),
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.lightGrey,
    marginHorizontal: wp('2'),
  },
  text: {
    fontSize: wp('3'),
    color: Colors.lightGrey,
  },
  loginBoxes: {
    width: wp('25'),
    height: wp('15'),
    backgroundColor: Colors.darkGrey,
    borderRadius: wp('1'),
    alignItems: 'center',
    justifyContent: 'center',
  },

  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },

  footer: {
    height: wp('20'),
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: wp('5'),
  },
  switchSize: {
    transform:
      Platform.OS === 'ios'
        ? [{scaleX: 0.8}, {scaleY: 0.8}]
        : [{scaleX: 1}, {scaleY: 1}],
  },
});
export default styles;
