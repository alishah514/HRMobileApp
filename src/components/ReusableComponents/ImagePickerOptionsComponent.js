import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import {wp} from '../common/Dimensions';
import {Colors} from '../common/Colors';

export default function ImagePickerOptionsComponent({
  isVisible,
  onClose,
  clickImage,
  pickImage,
}) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}>
      <View style={styles.imageModal}>
        <View style={styles.imageModalContainer}>
          <View style={{width: '100%', flexDirection: 'row'}}>
            <Text style={styles.imageModalHeading}>Upload or Take Photos</Text>
            <TouchableOpacity style={styles.imageHeader} onPress={onClose}>
              <Image source={require('../../assets/icons/close-icon.png')} />
            </TouchableOpacity>
          </View>
          <View style={styles.imageModalBtnsContainer}>
            <View style={styles.imageModalBtnView}>
              <TouchableOpacity onPress={clickImage}>
                <View>
                  <Image
                    resizeMode="contain"
                    source={require('../../assets/icons/camera-icon.png')}
                    style={styles.imageModalIcon}
                  />
                  <Text style={styles.imageModalIconText}>Camera</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.imageModalBtnView}>
              <TouchableOpacity onPress={pickImage}>
                <View>
                  <Image
                    resizeMode="contain"
                    source={require('../../assets/icons/gallery-icon.png')}
                    style={styles.imageModalIcon}
                  />
                  <Text style={styles.imageModalIconText}>Gallery</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  //ImagePickerModal
  imageModal: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(64, 147, 239, 0.5)',
    paddingHorizontal: wp('3'),
  },
  imageModalContainer: {
    height: wp('65'),
    width: '100%',
    backgroundColor: Colors.whiteColor,
    borderRadius: 2,
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  imageModalHeading: {
    color: Colors.blackColor,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 20,
  },
  imageHeader: {
    marginTop: '2%',
    marginLeft: '50%',
  },
  imageModalBtnsContainer: {
    flexDirection: 'row',
    bottom: 0,
    marginBottom: 20,
  },
  imageModalBtnView: {
    width: '42%',
    margin: '4%',
    alignItems: 'center',
    borderColor: Colors.drawerColor,
    borderWidth: 2,
    borderRadius: 2,
    paddingVertical: wp('7'),
  },
  imageModalIcon: {
    height: wp('10'),
    marginBottom: wp('5'),
  },
  imageModalIconText: {
    color: Colors.drawerColor,
    fontWeight: 'bold',
    fontSize: wp('5'),
    alignSelf: 'center',
  },
});
