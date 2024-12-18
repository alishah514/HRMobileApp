import React from 'react';
import {Modal, View, Image, TouchableOpacity, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Colors} from '../common/Colors';

const FullScreenImageModal = ({visible, imageUrl, onClose}) => {
  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.container}>
        {/* Close Button */}
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Ionicons name="close" size={30} color={Colors.whiteColor} />
        </TouchableOpacity>

        {/* Full-Screen Image */}
        <Image
          source={{
            uri: imageUrl,
            cache: 'force-cache',
          }}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
    </Modal>
  );
};

export default FullScreenImageModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)', // Dark overlay background
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 40, // Adjust based on design
    right: 20,
    zIndex: 10,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
