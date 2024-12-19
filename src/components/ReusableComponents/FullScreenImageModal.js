import React from 'react';
import {Modal, View, Image, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Colors} from '../common/Colors';
import Constants from '../common/Constants';
import CommonStyles from '../common/CommonStyles';

const FullScreenImageModal = ({visible, imageUrl, onClose}) => {
  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={CommonStyles.imageContainer}>
        <TouchableOpacity style={CommonStyles.closeIcon} onPress={onClose}>
          <Ionicons
            name="close"
            size={Constants.SIZE.largeIcon}
            color={Colors.whiteColor}
          />
        </TouchableOpacity>

        <Image
          source={{
            uri: imageUrl,
            cache: 'force-cache',
          }}
          style={CommonStyles.fullscreenImage}
          resizeMode="contain"
        />
      </View>
    </Modal>
  );
};

export default FullScreenImageModal;
