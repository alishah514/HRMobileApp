import {View, Text} from 'react-native';
import React from 'react';
import CommonStyles from '../../../components/common/CommonStyles';
import styles from '../styles';
import {formatDate} from '../../../components/utils/dateUtils';

export default function AnnouncementComponent({announcement}) {
  return (
    <View style={[styles.boxView, CommonStyles.shadow]}>
      <Text
        style={[
          CommonStyles.font4P,
          CommonStyles.textBlack,
          CommonStyles.Bold600,
          CommonStyles.marginBottom2,
        ]}>
        {announcement?.title}
      </Text>

      <Text
        style={[
          CommonStyles.font3P,
          CommonStyles.textDarkGrey,
          CommonStyles.marginBottom1,
        ]}
        numberOfLines={2}>
        {announcement?.content}
      </Text>

      <Text
        style={[
          CommonStyles.font3P,
          CommonStyles.textBlack,
          CommonStyles.marginTop1,
        ]}>
        {formatDate(announcement?.creationDate)}
      </Text>
    </View>
  );
}
