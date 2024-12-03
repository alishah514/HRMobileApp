import React from 'react';
import {Alert, Platform, PermissionsAndroid} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import ImagePickerOptionsComponent from './ImagePickerOptionsComponent';
import {handleImageUploadAWS} from '../utils/HandleImageUploadAWS';

export default function ImagePickerComponent({
  setImage,
  setIsImagePickerOptionsVisible,
  isImagePickerOptionsVisible,
  toggleImageOptionsModal,
  folder,
}) {
  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs access to your camera.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.error('Camera permission request error:', err);
        return false;
      }
    }

    return true;
  };

  const handleImageFromGallery = async () => {
    try {
      const hasPermission = await requestCameraPermission();
      if (!hasPermission) {
        Alert.alert(
          'Permission denied',
          'Camera permission is required to access the gallery.',
        );
        return;
      }

      const image = await ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: false,
      });
      console.log('Gallery image: ', image.path);
      setImage(image.path);

      await handleImageUploadAWS(image, setImage, folder);
      setIsImagePickerOptionsVisible(false);
    } catch (error) {
      console.log('Gallery picker error: ', error);
      setIsImagePickerOptionsVisible(false);
    }
  };

  const handleImageFromCamera = async () => {
    try {
      const hasPermission = await requestCameraPermission();
      if (!hasPermission) {
        Alert.alert(
          'Permission denied',
          'Camera permission is required to take photos.',
        );
        return;
      }

      const image = await ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: true,
      });
      console.log('Camera image: ', image.path);
      setImage(image.path);

      await handleImageUploadAWS(image, setImage, folder);
      setIsImagePickerOptionsVisible(false);
    } catch (error) {
      console.log('Camera error: ', error);
      setIsImagePickerOptionsVisible(false);
    }
  };

  return (
    <ImagePickerOptionsComponent
      isVisible={isImagePickerOptionsVisible}
      onClose={toggleImageOptionsModal}
      clickImage={handleImageFromCamera}
      pickImage={handleImageFromGallery}
    />
  );
}
