import {View, Text, Image, FlatList, StyleSheet, Platform} from 'react-native';
import React from 'react';
import CommonStyles from '../../../components/common/CommonStyles';
import I18n from '../../../i18n/i18n';
import NoRecordView from '../../../components/ReusableComponents/NoRecordView';
import {wp} from '../../../components/common/Dimensions';
import {Colors} from '../../../components/common/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Constants from '../../../components/common/Constants';
import {TruncateTitle} from '../../../components/utils/TruncateTitle';

export default function AttendanceList({data, status}) {
  const isNoData = !data || data?.length === 0;

  const renderItem = ({item}) => {
    const userIdLast4 = item?.userId?.slice(-5);

    return (
      <View style={styles.card}>
        {item?.personal?.imageUrl ? (
          <Image
            source={{uri: item?.personal?.imageUrl}}
            style={styles.image}
            resizeMode="cover"
          />
        ) : (
          <Ionicons
            name={'person'}
            size={Constants.SIZE.xLargeIcon}
            color={Colors.silverColor}
          />
        )}
        <Text style={styles.name}>
          {TruncateTitle(item?.personal?.fullName, 10)}
        </Text>
        <Text style={styles.id}>
          {userIdLast4 ? `****${userIdLast4}` : 'null'}
        </Text>
        <View
          style={[
            styles.statusIndicator,
            {
              backgroundColor: item.isPresent
                ? Colors.greenColor
                : Colors.redColor,
            },
          ]}
        />
      </View>
    );
  };

  return (
    <View style={[CommonStyles.width80, CommonStyles.alignSelf]}>
      <Text
        style={[
          CommonStyles.bold6,
          CommonStyles.textBlack,
          CommonStyles.marginTop2,
        ]}>
        {status === 1
          ? I18n.t('employees')
          : status === 2
          ? I18n.t('present')
          : status === 3
          ? I18n.t('absent')
          : I18n.t('employees')}
      </Text>

      <View style={CommonStyles.paddingTop5} />

      {isNoData ? (
        <View style={CommonStyles.height100}>
          <NoRecordView errorMessage="No Record Found" />
        </View>
      ) : (
        <View>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            numColumns={3}
            contentContainerStyle={[
              {paddingBottom: Platform.OS === 'ios' ? wp(80) : wp(65)},
            ]}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: wp(2.5),
    padding: wp(1.5),
    borderRadius: wp(2),
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
    height: wp('30'),
  },

  name: {
    fontSize: wp(3.5),
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
    width: Constants.SIZE.xLargeIcon,
    height: Constants.SIZE.xLargeIcon,
    borderRadius: Constants.SIZE.xLargeIcon / 2,
  },
});
