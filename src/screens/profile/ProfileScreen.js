import React, {useEffect, useState} from 'react';
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
import {useDispatch, useSelector} from 'react-redux';
import I18n from '../../i18n/i18n';
import {fetchProfile} from '../../redux/profile/ProfileActions';
import LogoLoaderComponent from '../../components/ReusableComponents/LogoLoaderComponent';
import CardComponent from './types/CardComponent';

const tabs = [
  {id: 0, icon: 'person-outline', iconSet: Ionicons},
  {id: 1, icon: 'graduation', iconSet: SimpleLineIcons},
  {id: 2, icon: 'briefcase', iconSet: SimpleLineIcons},
  {id: 3, icon: 'card-outline', iconSet: Ionicons},
];

export default function ProfileScreen({navigation}) {
  const dispatch = useDispatch();
  const currentLanguage = useSelector(state => state.language.language);
  const userId = useSelector(state => state.login.userId);
  const {data: profile, isLoading} = useSelector(state => state.profile);

  const [activeTab, setActiveTab] = useState(0);
  const [image, setImage] = useState(null);
  const [isImagePickerOptionsVisible, setIsImagePickerOptionsVisible] =
    useState(false);
  const [isEditModal, setIsEditModal] = useState(false);

  useEffect(() => {
    if (userId) {
      fetchUserProfile();
    }
  }, [dispatch, userId]);

  const fetchUserProfile = () => {
    dispatch(fetchProfile(userId));
  };

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

  const onSuccess = () => {
    fetchUserProfile();
    toggleEditModal();
  };

  return (
    <CommonSafeAreaViewComponent>
      <Header
        title={I18n.t('profile')}
        onLeftIconPressed={handleDrawerOpen}
        leftIcon={
          <Ionicons
            name="menu"
            size={Constants.SIZE.medIcon}
            color={Colors.whiteColor}
          />
        }
        // onRightIconPressed={toggleEditModal}
        // rightIcon={
        //   <MaterialCommunityIcons
        //     name="account-edit-outline"
        //     size={Constants.SIZE.largeIcon}
        //     color={Colors.whiteColor}
        //   />
        // }
      />
      {isLoading && <LogoLoaderComponent />}
      <CustomerBackgroundComponent
        topChild={
          <ProfileHeader
            image={image}
            toggleImageOptionsModal={toggleImageOptionsModal}
            name={profile?.personal?.fullName}
            role={profile?.job?.Designation}
            // editable={true}
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
                    <PersonalInfo data={profile?.personal} />
                  ) : activeTab === 1 ? (
                    <EducationInfo data={profile?.education} />
                  ) : activeTab === 2 ? (
                    <WorkInfo data={profile?.job} />
                  ) : activeTab === 3 ? (
                    <CardComponent data={profile} />
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
        onSuccess={onSuccess}
        isModalVisible={isEditModal}
        data={profile}
      />
    </CommonSafeAreaViewComponent>
  );
}
