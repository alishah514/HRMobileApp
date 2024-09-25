import {StyleSheet} from 'react-native';
import {wp} from '../../../components/common/Dimensions';
import {Colors} from '../../../components/common/Colors';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  verticalLineContainer: {
    width: 20,
    alignItems: 'center',
  },
  verticalLine: {
    position: 'absolute',
    width: 2,
    height: '100%',
    backgroundColor: '#ddd',
    left: 9,
  },
  dot: {
    position: 'absolute',
    width: wp(4),
    height: wp(4),
    borderRadius: wp(2),
  },
  contentContainer: {
    flex: 1,
    paddingTop: wp(5),
    paddingLeft: wp(2),
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: wp('3'),
  },
  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: wp(3),
    height: wp(3),
    backgroundColor: 'orange',
    marginRight: wp('2'),
  },
  statusText: {
    fontSize: 14,
    color: '#333',
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: wp('5'),
    borderBottomWidth: wp(0.15),
    borderBottomColor: Colors.greyColor,
    // paddingLeft: wp(2),
  },
  iconContainer: {
    marginRight: 10,
  },
  taskTitle: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  userIcon: {
    backgroundColor: Colors.lightGrey,
    borderRadius: wp(4),
    width: wp(8),
    height: wp(8),

    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default styles;
