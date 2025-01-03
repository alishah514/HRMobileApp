import React, {useState} from 'react';
import {Alert, Platform, PermissionsAndroid} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import ImagePickerOptionsComponent from './ImagePickerOptionsComponent';
import {handleImageUploadAWS} from '../utils/HandleImageUploadAWS';
import {isSizeValid} from './DocumentSizeComponent';

export default function ImagePickerComponent({
  setImage,
  setIsImagePickerOptionsVisible,
  isImagePickerOptionsVisible,
  toggleImageOptionsModal,
  folder,
}) {
  const [isLoading, setIsLoading] = useState(false);

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

  const showConfirmationAlert = onConfirm => {
    Alert.alert(
      'Upload Confirmation',
      'Are you sure you want to upload this image?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: onConfirm,
        },
      ],
    );
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
        mediaType: 'photo',
      });

      // Check if image size is valid
      if (!isSizeValid(image)) {
        Alert.alert('File size error', 'Image size must be less than 5 MB.');
        return;
      }
      setImage(image);

      showConfirmationAlert(async () => {
        setIsLoading(true);
        await handleImageUploadAWS(image, setImage, folder, null, setIsLoading);
        setIsImagePickerOptionsVisible(false);
      });
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
        mediaType: 'photo',
      });
      if (!isSizeValid(image)) {
        Alert.alert('File size error', 'Image size must be less than 5 MB.');
        return;
      }
      setImage(image);

      showConfirmationAlert(async () => {
        setIsLoading(true);
        await handleImageUploadAWS(image, setImage, folder, null, setIsLoading);
        setIsImagePickerOptionsVisible(false);
      });
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
      isLoading={isLoading}
    />
  );
}
