import React, {useState} from 'react';

import Header from '../../components/ReusableComponents/Header/Header';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Constants from '../../components/common/Constants';
import {Colors} from '../../components/common/Colors';
import {FlatList, View} from 'react-native';
import CustomerBackgroundComponent from '../../components/ReusableComponents/CustomerBackgroundComponent';
import ImagePickerComponent from '../../components/ReusableComponents/ImagePickerComponent';
import styles from './styles';
import PersonalInfo from './types/PersonalInfo';
import WorkInfo from './types/WorkInfo';
import EducationInfo from './types/education/EducationInfo';
import EditProfileModal from './EditProfileModal';
import ProfileHeader from '../../components/ReusableComponents/Header/ProfileHeader';
import TabBarHeader from '../../components/ReusableComponents/Header/TabBarHeader';
import CommonSafeAreaViewComponent from '../../components/ReusableComponents/CommonComponents/CommonSafeAreaViewComponent';
import {useSelector} from 'react-redux';
import I18n from '../../i18n/i18n';

const tabs = [
  {id: 0, icon: 'person-outline', iconSet: Ionicons},
  {id: 1, icon: 'graduation', iconSet: SimpleLineIcons},
  {id: 2, icon: 'briefcase', iconSet: SimpleLineIcons},
];

export default function ProfileScreen({navigation}) {
  const currentLanguage = useSelector(state => state.language);
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
        title={I18n.t('profile')}
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
          <ProfileHeader
            image={image}
            toggleImageOptionsModal={toggleImageOptionsModal}
            name="Syed Ali Sultan Bukhari"
            role={I18n.t('mobile app developer')}
            editable={true}
          />
        }
        bottomChild={
          <>
            <TabBarHeader
              tabs={tabs}
              activeTab={activeTab}
              handleTabPress={handleTabPress}
            />
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
