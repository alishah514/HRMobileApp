import {Platform, StyleSheet} from 'react-native';
import {wp} from '../../components/common/Dimensions';
import {Colors} from '../../components/common/Colors';

const styles = StyleSheet.create({
  arrowBox: {
    width: wp('10'),
    height: wp('10'),
    borderRadius: wp('5'),
    backgroundColor: Colors.lightYellowColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  currentDayDot: {
    width: wp('1.5'),
    height: wp('1.5'),
    backgroundColor: Colors.greyColor,
    borderRadius: wp('0.75'),
    position: 'absolute',
    top: Platform.OS === 'android' ? 60 : 65,
  },
  calendarDateView: {
    width: wp('10'),
    height: wp('18'),
    borderRadius: wp('4'),
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  verticalLine: {
    position: 'absolute',
    left: wp('1.5'),
    top: wp('2'),
    bottom: 0,
    width: 2,
    backgroundColor: Colors.lightGrey,
    zIndex: 0,
  },
  itemContainer: {
    flexDirection: 'row',
    marginBottom: wp('5'),
  },
  leftContainer: {
    alignItems: 'center',
    marginRight: wp('2.5'),
    position: 'relative',
  },
  dot: {
    marginTop: wp('2'),
    width: wp('3'),
    height: wp('3'),
    borderRadius: wp('2'),

    zIndex: 2,
  },
  rightContainer: {
    flex: 1,
  },
  type: {
    fontSize: wp('3.8'),
  },
  typeSmall: {
    fontSize: wp('3.5'),
  },
  title: {
    fontSize: wp('4'),
    fontWeight: '600',
    color: Colors.blackColor,
  },
  description: {
    fontSize: wp('3.5'),
    color: '#555',
    marginTop: wp('1'),
  },
  itemBox: {
    paddingHorizontal: wp('2'),
    paddingVertical: wp('1'),
    backgroundColor: Colors.whiteColor,
    borderWidth: wp('0.2'),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: wp('5'),
    marginBottom: wp('2'),
    alignSelf: 'flex-start',
  },
  boxRecord: {
    width: wp('70'),
    height: wp('20'),
    backgroundColor: Colors.whiteColor,
    borderRadius: wp('10'),
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: wp('5'),
    marginTop: wp('5'),
  },

  mapContainer: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '50%',
  },
  calloutContainer: {
    width: wp('40'),
    padding: wp('2'),
    backgroundColor: 'white',
    borderRadius: wp('2'),
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: {width: 0, height: 2},
    elevation: 3,
    ...(Platform.OS === 'ios' ? {position: 'absolute', top: 30, left: 30} : {}),
  },
  calloutTitle: {
    fontWeight: 'bold',
    color: Colors.blueColor,
    marginBottom: 4,
  },
  calloutText: {
    color: Colors.black,
    marginBottom: wp('2'),
  },
  calloutTitleBelow: {
    fontWeight: 'bold',
    color: Colors.blueColor,
    marginBottom: wp('1'),
    marginTop: wp('3'),

    fontSize: wp('4'),
    textAlign: 'center',
  },
  calloutTextBelow: {
    color: Colors.blackColor,
    marginBottom: wp('2'),
    fontSize: wp('4.5'),
    textAlign: 'center',
    fontWeight: '500',
  },
  imageStyle: {
    width: wp('35'),
    height: wp('35'),
    backgroundColor: Colors.whiteColor,
    overflow: 'hidden',
    borderRadius: wp('17'),
    marginTop: wp('5'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageFull: {
    width: '100%',
    height: '100%',
  },

  card: {
    width: wp(25),
    height: wp(30),
    borderRadius: wp(2),
    backgroundColor: Colors.whiteColor,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
    borderColor: Colors.blackColor,
    margin: wp(1),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: wp(0.1),
  },

  name: {
    fontSize: wp(3.5),
    fontWeight: '500',
    color: Colors.blackColor,
    textAlign: 'center',
    paddingTop: wp(4),
  },
  id: {
    fontSize: wp(3),
    color: Colors.blackColor,
    textAlign: 'center',
    paddingTop: wp(2),
  },
  statusIndicator: {
    width: wp(4),
    height: wp(4),
    borderRadius: wp(2),
    position: 'absolute',
    top: 0,
    right: 0,
  },
  image: {
    width: wp('11'),
    height: wp('11'),
    borderRadius: wp('11') / 2,
  },
});
export default styles;
