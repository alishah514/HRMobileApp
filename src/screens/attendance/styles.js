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
    width: wp('40'), // Adjust width as needed
    padding: wp('2'),
    backgroundColor: 'white', // Background color of the tooltip
    borderRadius: wp('2'), // Rounded corners
    shadowColor: '#000', // Shadow color for Android
    shadowOpacity: 0.2, // Shadow opacity for Android
    shadowRadius: 4, // Shadow radius for Android
    shadowOffset: {width: 0, height: 2}, // Shadow offset for Android
    elevation: 3, // Elevation for Android
  },
  calloutTitle: {
    fontWeight: 'bold',
    color: Colors.blueColor, // Change as per your color scheme
    marginBottom: 4,
  },
  calloutText: {
    color: Colors.black, // Change as per your color scheme
    marginBottom: 8,
  },
  calloutTitleBelow: {
    fontWeight: 'bold',
    color: Colors.blueColor, // Change as per your color scheme
    marginBottom: wp('1'),
    marginTop: wp('3'),

    fontSize: wp('4'),
  },
  calloutTextBelow: {
    color: Colors.black, // Change as per your color scheme
    marginBottom: 8,
    fontSize: wp('4'),
  },
  imageStyle: {
    width: wp('35'),
    height: wp('35'),
    backgroundColor: 'grey',
    overflow: 'hidden',
    borderRadius: 10,
    marginTop: wp('5'),
  },
  imageFull: {
    width: '100%',
    height: '100%',
  },
});
export default styles;
