import React from 'react';
import {View, Text, TouchableOpacity, Linking, Alert} from 'react-native';
import CommonStyles from '../common/CommonStyles';
import I18n from '../../i18n/i18n';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../common/Colors';

const AttachmentPicker = ({
  attachment,
  handleDocumentPick,
  editable = true,
}) => {
  const openDocument = async () => {
    try {
      const supported =
        attachment.startsWith('http') || attachment.startsWith('https');
      if (supported) {
        await Linking.openURL(attachment);
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
    <View>
      <Text style={[CommonStyles.lessBold3P5, CommonStyles.textBlue]}>
        {I18n.t('attachDocument')}
      </Text>
      <View style={CommonStyles.attachmentContainer}>
        <TouchableOpacity
          style={CommonStyles.alignSelf}
          onPress={handleDocumentPick}
          disabled={!editable}>
          <LinearGradient
            colors={[Colors.whiteColor, Colors.lightGrey]}
            style={CommonStyles.attachmentGradientButton}>
            <Text
              style={[
                CommonStyles.font3P,
                CommonStyles.bold500,
                CommonStyles.textBlack,
              ]}>
              {editable ? 'Choose File' : 'Press Link'}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
        <View style={CommonStyles.attachmentNoFileTextContainer}>
          <TouchableOpacity
            onPress={() => {
              if (attachment) {
                openDocument(attachment);
              }
            }}
            disabled={!attachment}>
            <Text
              numberOfLines={2}
              style={[
                CommonStyles.width50,
                attachment ? CommonStyles.textBlue : CommonStyles.textBlack,
                CommonStyles.font3P,
                attachment && CommonStyles.underlineText,
              ]}>
              {attachment
                ? attachment.split('_').slice(1).join('_').slice(-25)
                : 'No file selected'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default AttachmentPicker;
