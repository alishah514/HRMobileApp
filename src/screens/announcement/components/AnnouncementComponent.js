import {View, Text, TouchableOpacity, Linking} from 'react-native';
import React, {useState} from 'react';
import CommonStyles from '../../../components/common/CommonStyles';
import styles from '../styles';
import {formatDate} from '../../../components/utils/dateUtils';
import {TruncateTitle} from '../../../components/utils/TruncateTitle';
import {useLoginData} from '../../../hooks/useLoginData';
import ViewDetailsAnnouncementModal from '../modals/ViewDetailsAnnouncementModal';

export default function AnnouncementComponent({announcement}) {
  const {role} = useLoginData();
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  const toggleEditModal = () => {
    setIsEditModalVisible(!isEditModalVisible);
  };

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
      <View style={[CommonStyles.rowBetween, CommonStyles.alignItemsCenter]}>
        <Text
          style={[
            CommonStyles.font4P,
            CommonStyles.textBlack,
            CommonStyles.Bold600,
            CommonStyles.marginBottom2,
          ]}
          numberOfLines={2}>
          {TruncateTitle(announcement?.title, 22)}
        </Text>

        <TouchableOpacity onPress={toggleEditModal}>
          <Text
            style={[
              CommonStyles.font3P,
              CommonStyles.textGrey,
              CommonStyles.Bold600,
            ]}>
            {role === 'Admin' ? 'Update Details' : 'View Details'}
          </Text>
        </TouchableOpacity>
      </View>

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
      <ViewDetailsAnnouncementModal
        isModalVisible={isEditModalVisible}
        toggleModal={toggleEditModal}
        data={announcement}
      />
    </View>
  );
}
