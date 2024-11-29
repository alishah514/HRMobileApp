import {StyleSheet} from 'react-native';
import {wp} from '../../components/common/Dimensions';
import {Colors} from '../../components/common/Colors';

const styles = StyleSheet.create({
  parentStyle: {
    borderWidth: wp(0.5),
    borderTopLeftRadius: wp(5),
    borderTopRightRadius: wp(5),
    borderBottomRightRadius: wp(2.5),
    borderBottomLeftRadius: wp(2.5),
    borderColor: Colors.orangeColor,
  },
  container: {
    flex: 1,
    padding: wp(4),
    backgroundColor: Colors.whiteColor,
  },
  eventDetails: {
    paddingVertical: wp(3.5),
  },
  eventTitle: {
    fontSize: wp(5),
    fontWeight: '600',
    paddingTop: wp(2),
  },
  eventDate: {
    fontSize: wp(3.5),
    fontWeight: '500',
    color: Colors.blackColor,
  },
});
export default styles;
