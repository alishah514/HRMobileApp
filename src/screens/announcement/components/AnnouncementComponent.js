import {View, Text, TouchableOpacity, Linking} from 'react-native';
import React from 'react';
import CommonStyles from '../../../components/common/CommonStyles';
import styles from '../styles';
import {formatDate} from '../../../components/utils/dateUtils';

export default function AnnouncementComponent({announcement}) {
  const openDocument = async link => {
    try {
      const supported = link.startsWith('http') || link.startsWith('https');
      if (supported) {
        await Linking.openURL(link);
      } else {
        Alert.alert('Error', 'Invalid document URL.');
      }
    } catch (error) {
      console.error('Error opening document:', error);
      Alert.alert(
        'Error',
        'An unexpected error occurred while trying to open the document.',
      );
    }
  };
  return (
    <View style={[styles.boxView, CommonStyles.shadow]}>
      <Text
        style={[
          CommonStyles.font4P,
          CommonStyles.textBlack,
          CommonStyles.Bold600,
          CommonStyles.marginBottom2,
        ]}
        numberOfLines={2}>
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
      <View style={[CommonStyles.rowBetween, CommonStyles.alignItemsCenter]}>
        <Text
          style={[
            CommonStyles.font3P,
            CommonStyles.textBlack,
            CommonStyles.marginTop1,
          ]}>
          {formatDate(announcement?.creationDate)}
        </Text>
        {announcement?.attachment && (
          <TouchableOpacity
            onPress={() => openDocument(announcement?.attachment)}>
            <Text
              style={[
                CommonStyles.font3,
                announcement?.attachment
                  ? CommonStyles.textBlue
                  : CommonStyles.textDarkGrey,
                CommonStyles.Bold600,
                CommonStyles.marginLeft5,
                CommonStyles.underlineText,
              ]}>
              {announcement?.attachment
                .split('_')
                .slice(1)
                .join('_')
                .slice(-25)}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
