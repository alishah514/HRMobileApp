import React, {useState} from 'react';

import CommonSafeAreaViewComponent from '../../components/ReusableComponents/CommonSafeAreaViewComponent';
import Header from '../../components/ReusableComponents/Header/Header';
import LogoutConfirmationComponent from '../../components/ReusableComponents/LogoutConfirmationComponent';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Constants from '../../components/common/Constants';
import {Colors} from '../../components/common/Colors';
import CommonStyles from '../../components/common/CommonStyles';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import CustomerBackgroundComponent from '../../components/ReusableComponents/CustomerBackgroundComponent';
import ImagePickerComponent from '../../components/ReusableComponents/ImagePickerComponent';
import styles from './styles';
import PersonalInfo from './types/PersonalInfo';
import WorkInfo from './types/WorkInfo';
import EducationInfo from './types/education/EducationInfo';
import EditProfileModal from './EditProfileModal';

const tabs = [
  {id: 0, icon: 'person-outline', iconSet: Ionicons},
  {id: 1, icon: 'graduation', iconSet: SimpleLineIcons},
  {id: 2, icon: 'briefcase', iconSet: SimpleLineIcons},
];

export default function ProfileScreen({navigation}) {
  const [activeTab, setActiveTab] = useState(0);
  const [image, setImage] = useState(null);
  const [isImagePickerOptionsVisible, setIsImagePickerOptionsVisible] =
    useState(false);
  const [isEditModal, setIsEditModal] = useState(false);

  const toggleEditModal = () => {
    setIsEditModal(!isEditModal);
  };

  const toggleImageOptionsModal = () => {
    setIsImagePickerOptionsVisible(!isImagePickerOptionsVisible);
  };

  const handleTabPress = index => {
    setActiveTab(index);
  };

  const handleDrawerOpen = () => {
    navigation.openDrawer();
  };

  return (
    <CommonSafeAreaViewComponent>
      <Header
        title="Profile"
        onLeftIconPressed={handleDrawerOpen}
        leftIcon={
          <Ionicons
            name="menu"
            size={Constants?.SIZE.medIcon}
            color={Colors.whiteColor}
          />
        }
        onRightIconPressed={toggleEditModal}
        rightIcon={
          <MaterialCommunityIcons
            name="account-edit-outline"
            size={Constants?.SIZE.largeIcon}
            color={Colors.whiteColor}
          />
        }
      />
      <CustomerBackgroundComponent
        topChild={
          <View style={styles.paddingBottom5Align}>
            <TouchableOpacity
              onPress={toggleImageOptionsModal}
              style={styles.imageCircle}>
              <View style={styles.editPenIconCircle}>
                <SimpleLineIcons
                  name={'pencil'}
                  size={Constants.SIZE.smallIcon}
                  color={Colors.whiteColor}
                />
              </View>
              {image ? (
                <Image
                  source={{uri: image.path}}
                  resizeMode="cover"
                  style={styles.imageView}
                />
              ) : (
                <Ionicons
                  name={'person'}
                  size={Constants.SIZE.xxLargeIcon}
                  color={Colors.silverColor}
                />
              )}
            </TouchableOpacity>
            <View style={CommonStyles.alignItemsCenter}>
              <Text
                style={[
                  CommonStyles.bold6,
                  CommonStyles.textWhite,
                  CommonStyles.marginTop2,
                ]}>
                Syed Ali Sultan Bukhari
              </Text>
              <Text style={[CommonStyles.font5, CommonStyles.textWhite]}>
                Mobile App Developer
              </Text>
            </View>
          </View>
        }
        bottomChild={
          <>
            <View style={[styles.tabChange, CommonStyles.shadow]}>
              {tabs.map(tab => {
                const IconComponent = tab.iconSet;
                const isActive = activeTab === tab.id;

                return (
                  <TouchableOpacity
                    key={tab.id}
                    style={[
                      isActive
                        ? styles.activeTabIconCircle
                        : styles.nonActiveTabIconCircle,
                    ]}
                    onPress={() => handleTabPress(tab.id)}>
                    <IconComponent
                      name={tab.icon}
                      size={Constants.SIZE.largeIcon}
                      color={isActive ? Colors.whiteColor : Colors.blackColor}
                    />
                  </TouchableOpacity>
                );
              })}
            </View>
            <FlatList
              style={styles.maxHeight}
              contentContainerStyle={[styles.infoStarting]}
              data={[activeTab]}
              renderItem={() => (
                <View>
                  {activeTab === 0 ? (
                    <PersonalInfo />
                  ) : activeTab === 1 ? (
                    <EducationInfo />
                  ) : activeTab === 2 ? (
                    <WorkInfo />
                  ) : null}
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </>
        }
      />
      <ImagePickerComponent
        setImage={setImage}
        setIsImagePickerOptionsVisible={setIsImagePickerOptionsVisible}
        isImagePickerOptionsVisible={isImagePickerOptionsVisible}
        toggleImageOptionsModal={toggleImageOptionsModal}
      />
      <EditProfileModal
        onClose={toggleEditModal}
        isModalVisible={isEditModal}
      />
    </CommonSafeAreaViewComponent>
  );
}
