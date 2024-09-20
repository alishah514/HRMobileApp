import React from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {Colors} from '../../../components/common/Colors';
import {hp, wp} from '../../../components/common/Dimensions';
import CommonStyles from '../../../components/common/CommonStyles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Constants from '../../../components/common/Constants';

const data = [
  {
    type: 'Sick Leave',
    fromDate: '15-01-2024',
    toDate: '17-01-2024',
    period: '3 Days',
    reason: 'Flu and fever, advised bed rest by the doctor',
  },
  {
    type: 'Casual Leave',
    fromDate: '10-02-2024',
    toDate: '10-02-2024',
    period: '1 Day',
    reason: 'Attending a family function',
  },
  {
    type: 'Plan Leave',
    fromDate: '05-03-2024',
    toDate: '07-03-2024',
    period: '3 Days',
    reason: 'Vacation with family out of town',
  },
  {
    type: 'Sick Leave',
    fromDate: '20-02-2024',
    toDate: '21-02-2024',
    period: '2 Days',
    reason: 'Dental surgery recovery',
  },
  {
    type: 'Casual Leave',
    fromDate: '18-03-2024',
    toDate: '18-03-2024',
    period: '1 Day',
    reason: 'Personal errands and appointments',
  },
  {
    type: 'Emergency Leave',
    fromDate: '22-02-2024',
    toDate: '23-02-2024',
    period: '2 Days',
    reason: 'Sudden family medical emergency',
  },
];

const Timeline = () => {
  return (
    <View>
      <View style={styles.verticalLine} />
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <View style={styles.itemContainer}>
            <View style={styles.leftContainer}>
              <View style={styles.dot} />
            </View>
            <View style={styles.rightContainer}>
              <View
                style={[
                  CommonStyles.rowBetween,
                  CommonStyles.alignItemsCenter,
                ]}>
                <View
                  style={{
                    paddingHorizontal: wp('2'),
                    paddingVertical: wp('1'),

                    backgroundColor: Colors.whiteColor,
                    borderWidth: wp('0.2'),
                    borderColor: Colors.yellowColor,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: wp('5'),
                    marginBottom: wp('2'),
                    alignSelf: 'flex-start', // This allows the view to take the width of its content
                  }}>
                  <Text style={styles.type}>{item.type}</Text>
                </View>
                <Text style={styles.typeSmall}>View Details</Text>
              </View>
              <View style={CommonStyles.rowBetween}>
                <View
                  style={[CommonStyles.flexRow, CommonStyles.alignItemsCenter]}>
                  <Ionicons
                    name="calendar-outline"
                    size={Constants.SIZE.medIcon}
                    color={Colors.yellowColor}
                  />
                  <Text
                    style={[
                      styles.title,
                      CommonStyles.paddingLeft2,
                    ]}>{`${item.fromDate} `}</Text>
                </View>
                <View
                  style={[CommonStyles.flexRow, CommonStyles.alignItemsCenter]}>
                  <Ionicons
                    name="calendar-outline"
                    size={Constants.SIZE.medIcon}
                    color={Colors.yellowColor}
                  />
                  <Text
                    style={[
                      styles.title,
                      CommonStyles.paddingLeft2,
                    ]}>{`${item.toDate}`}</Text>
                </View>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
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
    marginBottom: wp('10'),
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
    backgroundColor: Colors.yellowColor,
    zIndex: 2,
  },
  rightContainer: {
    flex: 1,
  },
  type: {
    fontSize: wp('3.8'),
    color: Colors.yellowColor,
  },
  typeSmall: {
    fontSize: wp('3.5'),
    color: Colors.yellowColor,
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
});

export default Timeline;
