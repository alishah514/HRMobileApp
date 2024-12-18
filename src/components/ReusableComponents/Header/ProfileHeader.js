import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {Colors} from '../../../components/common/Colors';
import Constants from '../../../components/common/Constants';
import CommonStyles from '../../../components/common/CommonStyles';
import useProfileData from '../../../hooks/useProfileData';
import {useLoginData} from '../../../hooks/useLoginData';
import FullScreenImageModal from '../FullScreenImageModal';

export default function ProfileHeader({
  image,
  toggleImageOptionsModal,
  name,
  // role,
  editable = false,
}) {
  const {profile} = useProfileData();
  const {role} = useLoginData();
  const [isImageModalVisible, setIsImageModalVisible] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  const toggleImageModal = url => {
    setImageUrl(url);
    setIsImageModalVisible(!isImageModalVisible);
  };

  return (
    <View style={CommonStyles.paddingBottom5Align}>
      {editable ? (
        <TouchableOpacity
          onPress={toggleImageOptionsModal}
          style={CommonStyles.imageCircle}>
          <View style={CommonStyles.editPenIconCircle}>
            <SimpleLineIcons
              name={'pencil'}
              size={Constants.SIZE.smallIcon}
              color={Colors.whiteColor}
            />
          </View>
          {image ? (
            <Image
              source={{uri: image}}
              resizeMode="cover"
              style={CommonStyles.imageView}
            />
          ) : (
            <Ionicons
              name={'person'}
              size={Constants.SIZE.xxxLargeIcon}
              color={Colors.silverColor}
            />
          )}
        </TouchableOpacity>
      ) : (
        <View style={CommonStyles.imageCircle}>
          {profile?.personal?.imageUrl &&
          profile?.personal?.imageUrl !== 'null' ? (
            <TouchableOpacity
              onPress={() => toggleImageModal(profile?.personal?.imageUrl)}>
              <Image
                source={{uri: profile.personal.imageUrl}}
                style={CommonStyles.imageCircle}
              />
            </TouchableOpacity>
          ) : (
            <Ionicons
              name="person"
              size={Constants.SIZE.xxxLargeIcon}
              color={Colors.silverColor}
            />
          )}
        </View>
      )}

      <View style={CommonStyles.alignItemsCenter}>
        <Text
          style={[
            CommonStyles.bold6,
            CommonStyles.textWhite,
            CommonStyles.marginTop2,
          ]}>
          {profile?.personal?.fullName || name}
        </Text>
        <Text style={[CommonStyles.font5, CommonStyles.textWhite]}>
          {role || 'Undefined'}
        </Text>
      </View>
      <FullScreenImageModal
        visible={isImageModalVisible}
        imageUrl={imageUrl}
        onClose={() => setIsImageModalVisible(false)}
      />
    </View>
  );
}
