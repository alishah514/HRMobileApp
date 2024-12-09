import {View, Text, Image, FlatList, Platform} from 'react-native';
import React from 'react';
import CommonStyles from '../../../components/common/CommonStyles';
import I18n from '../../../i18n/i18n';
import NoRecordView from '../../../components/ReusableComponents/NoRecordView';
import {wp} from '../../../components/common/Dimensions';
import {Colors} from '../../../components/common/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Constants from '../../../components/common/Constants';
import {TruncateTitle} from '../../../components/utils/TruncateTitle';
import styles from '../styles';

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
    <View style={CommonStyles.paddingHor5}>
      <Text
        style={[
          CommonStyles.bold6,
          CommonStyles.textBlack,
          CommonStyles.marginTop2,
          CommonStyles.paddingLeft2,
        ]}>
        {status === 1
          ? I18n.t('employees')
          : status === 2
          ? I18n.t('present')
          : status === 3
          ? I18n.t('absent')
          : I18n.t('employees')}
      </Text>

      <View style={CommonStyles.paddingTop2} />

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
            columnWrapperStyle={CommonStyles.columnWrapper}
            contentContainerStyle={[
              {paddingBottom: Platform.OS === 'ios' ? wp(80) : wp(60)},
            ]}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}
    </View>
  );
}
