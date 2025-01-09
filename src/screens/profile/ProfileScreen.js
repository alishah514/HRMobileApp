import React, {useEffect, useState} from 'react';
import Header from '../../components/ReusableComponents/Header/Header';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Constants from '../../components/common/Constants';
import {Colors} from '../../components/common/Colors';
import {FlatList, View} from 'react-native';
import CustomerBackgroundComponent from '../../components/ReusableComponents/CustomerBackgroundComponent';
import ImagePickerComponent from '../../components/ReusableComponents/ImagePickerComponent';
import styles from './styles';
import PersonalInfo from './types/PersonalInfo';
import WorkInfo from './types/WorkInfo';
import EducationInfo from './types/education/EducationInfo';
import ProfileHeader from '../../components/ReusableComponents/Header/ProfileHeader';
import TabBarHeader from '../../components/ReusableComponents/Header/TabBarHeader';
import CommonSafeAreaViewComponent from '../../components/ReusableComponents/CommonComponents/CommonSafeAreaViewComponent';
import {useDispatch, useSelector} from 'react-redux';
import I18n from '../../i18n/i18n';
import {fetchProfile} from '../../redux/profile/ProfileActions';
import LogoLoaderComponent from '../../components/ReusableComponents/LogoLoaderComponent';
import CardComponent from './types/CardComponent';
import {useLoginData} from '../../hooks/useLoginData';

const tabs = [
  {id: 0, icon: 'person-outline', iconSet: Ionicons},
  {id: 1, icon: 'graduation', iconSet: SimpleLineIcons},
  {id: 2, icon: 'briefcase', iconSet: SimpleLineIcons},
  {id: 3, icon: 'card-outline', iconSet: Ionicons},
];

export default function ProfileScreen({navigation}) {
  const currentLanguage = useSelector(state => state.language.language);

  const dispatch = useDispatch();
  const {userId} = useLoginData();
  const {data: profile, isLoading} = useSelector(state => state.profile);

  const [activeTab, setActiveTab] = useState(0);
  const [image, setImage] = useState(null);
  const [isImagePickerOptionsVisible, setIsImagePickerOptionsVisible] =
    useState(false);

  useEffect(() => {
    if (userId) {
      fetchUserProfile();
    }
  }, [dispatch, userId]);

  useEffect(() => {
    const imageUrl = profile?.personal?.imageUrl;
    if (imageUrl && imageUrl !== 'null') {
      setImage(imageUrl);
    }
  }, [profile]);

  const fetchUserProfile = () => {
    dispatch(fetchProfile(userId));
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
      {isLoading && <LogoLoaderComponent />}
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
      />

      <CustomerBackgroundComponent
        topChild={
          <ProfileHeader
            image={image}
            toggleImageOptionsModal={toggleImageOptionsModal}
            name={profile?.personal?.fullName}
            role={profile?.job?.Designation}
            editable={false}
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
                  {(() => {
                    const employeeId = profile?.name?.split('/').pop();
                    return (
                      <>
                        {activeTab === 0 ? (
                          <PersonalInfo
                            data={profile?.personal}
                            employeeId={employeeId}
                          />
                        ) : activeTab === 1 ? (
                          <EducationInfo data={profile?.education} />
                        ) : activeTab === 2 ? (
                          <WorkInfo data={profile?.job} />
                        ) : activeTab === 3 ? (
                          <CardComponent
                            data={profile}
                            employeeId={employeeId}
                          />
                        ) : null}
                      </>
                    );
                  })()}
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
        folder={'profile'}
      />
    </CommonSafeAreaViewComponent>
  );
}
