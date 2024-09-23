import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import {Colors} from '../../../components/common/Colors';
import {hp, wp} from '../../../components/common/Dimensions';
import CommonStyles from '../../../components/common/CommonStyles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Constants from '../../../components/common/Constants';

const Timeline = ({color, data, toggleViewLeaveRequestModal}) => {
  return (
    <View>
      <View style={styles.verticalLine} />
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <View style={styles.itemContainer}>
            <View style={styles.leftContainer}>
              <View
                style={[
                  styles.dot,
                  {backgroundColor: color ? color : Colors.yellowColor},
                ]}
              />
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
                    borderColor: color ? color : Colors.yellowColor,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: wp('5'),
                    marginBottom: wp('2'),
                    alignSelf: 'flex-start',
                  }}>
                  <Text
                    style={[
                      styles.type,
                      {color: color ? color : Colors.yellowColor},
                    ]}>
                    {item.type}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => toggleViewLeaveRequestModal(item)}>
                  <Text
                    style={[
                      styles.typeSmall,
                      CommonStyles.underlineText,
                      {color: color ? color : Colors.yellowColor},
                    ]}>
                    View Details
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={CommonStyles.rowBetween}>
                <View
                  style={[CommonStyles.flexRow, CommonStyles.alignItemsCenter]}>
                  <Ionicons
                    name="calendar-outline"
                    size={Constants.SIZE.medIcon}
                    color={color ? color : Colors.yellowColor}
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
                    color={color ? color : Colors.yellowColor}
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
});

export default Timeline;
