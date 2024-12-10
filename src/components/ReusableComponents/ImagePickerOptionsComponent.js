import React from 'react';
import {View, Text, Modal, TouchableOpacity, Image} from 'react-native';
import {useSelector} from 'react-redux';
import I18n from '../../i18n/i18n';
import CommonStyles from '../common/CommonStyles';
import LogoLoaderComponent from './LogoLoaderComponent';

export default function ImagePickerOptionsComponent({
  isVisible,
  onClose,
  clickImage,
  pickImage,
  isLoading,
}) {
  const currentLanguage = useSelector(state => state.language.language);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}>
      <View style={CommonStyles.imageModal}>
        {isLoading && <LogoLoaderComponent />}
        <View style={CommonStyles.imageModalContainer}>
          <View style={CommonStyles.rowBetween}>
            <Text style={CommonStyles.imageModalHeading}>
              {I18n.t('uploadOrTakePhotos')}
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Image source={require('../../assets/icons/close-icon.png')} />
            </TouchableOpacity>
          </View>
          <View style={CommonStyles.imageModalBtnsContainer}>
            <View style={CommonStyles.imageModalBtnView}>
              <TouchableOpacity onPress={clickImage}>
                <View>
                  <Image
                    resizeMode="contain"
                    source={require('../../assets/icons/camera-icon.png')}
                    style={CommonStyles.imageModalIcon}
                  />
                  <Text style={CommonStyles.imageModalIconText}>
                    {I18n.t('camera')}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={CommonStyles.imageModalBtnView}>
              <TouchableOpacity onPress={pickImage}>
                <View>
                  <Image
                    resizeMode="contain"
                    source={require('../../assets/icons/gallery-icon.png')}
                    style={CommonStyles.imageModalIcon}
                  />
                  <Text style={CommonStyles.imageModalIconText}>
                    {I18n.t('gallery')}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}
