import React, {useEffect, useState} from 'react';
import {View, Text, FlatList} from 'react-native';
import CommonSafeAreaViewComponent from '../../components/ReusableComponents/CommonComponents/CommonSafeAreaViewComponent';
import Header from '../../components/ReusableComponents/Header/Header';
import I18n from '../../i18n/i18n';
import {useDispatch, useSelector} from 'react-redux';
import Constants from '../../components/common/Constants';
import {Colors} from '../../components/common/Colors';
import {useLoginData} from '../../hooks/useLoginData';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CommonStyles from '../../components/common/CommonStyles';
import CustomerBackgroundComponent from '../../components/ReusableComponents/CustomerBackgroundComponent';
import TabBarHeader from '../../components/ReusableComponents/Header/TabBarHeader';
import AnnouncementComponent from './components/AnnouncementComponent';
import {fetchAllAnnouncements} from '../../redux/announcements/AnnouncementActions';
import styles from './styles';
import AddAnnouncementModal from './modals/AddAnnouncemenModal';
import LogoLoaderComponent from '../../components/ReusableComponents/LogoLoaderComponent';

const tabs = [
  {
    id: 0,
    icon: 'announcement',
    iconSet: MaterialIcons,
    color: Colors.greenColor,
  },
  {
    id: 1,
    icon: 'announcement',
    iconSet: MaterialIcons,
    color: Colors.blueColor,
  },
  {
    id: 2,
    icon: 'announcement',
    iconSet: MaterialIcons,
    color: Colors.orangeColor,
  },
];

export default function AnnouncementScreen({navigation}) {
  const dispatch = useDispatch();
  const currentLanguage = useSelector(state => state.language.language);
  const {announcements, isLoading} = useSelector(state => state.announcements);
  const {role} = useLoginData();
  const [activeTab, setActiveTab] = useState(0);
  const [isAddAnnouncementModalVisible, setIsAddAnnouncementModalVisible] =
    useState(false);

  useEffect(() => {
    dispatch(fetchAllAnnouncements());
  }, [dispatch]);

  const handleDrawerOpen = () => {
    navigation.openDrawer();
  };

  const handleTabPress = index => {
    setActiveTab(index);
  };

  const toggleAddAnnouncementModal = () => {
    setIsAddAnnouncementModalVisible(!isAddAnnouncementModalVisible);
  };

  const getFilteredAnnouncements = () => {
    switch (activeTab) {
      case 0:
        return announcements;
      case 1:
        return announcements.filter(
          announcement => announcement.announcementFor === 'M3LOGI',
        );
      case 2:
        return announcements.filter(
          announcement => announcement.announcementFor === 'Courage',
        );
      default:
        return [];
    }
  };

  return (
    <CommonSafeAreaViewComponent>
      <Header
        title={I18n.t('announcements')}
        onLeftIconPressed={handleDrawerOpen}
        leftIcon={
          <Ionicons
            name="menu"
            size={Constants.SIZE.medIcon}
            color={Colors.whiteColor}
          />
        }
        onRightIconPressed={toggleAddAnnouncementModal}
        rightIcon={
          role === 'Admin' && (
            <Entypo
              name="add-to-list"
              size={Constants.SIZE.medIcon}
              color={Colors.whiteColor}
            />
          )
        }
      />
      {isLoading && <LogoLoaderComponent />}
      <CustomerBackgroundComponent
        topVerySmall
        topChild={
          <View style={[CommonStyles.width90, CommonStyles.paddingBottom7]}>
            <Text style={[CommonStyles.lessBold5P, CommonStyles.textWhite]}>
              {I18n.t('announcementList')}
            </Text>
          </View>
        }
        bottomChild={
          <>
            <TabBarHeader
              tabs={tabs}
              activeTab={activeTab}
              handleTabPress={handleTabPress}
            />
            <View style={styles.marginPadding}>
              <Text
                style={[
                  CommonStyles.font5,
                  CommonStyles.textBlack,
                  CommonStyles.bold500,
                ]}>
                {activeTab === 0
                  ? 'All Announcements'
                  : activeTab === 1
                  ? 'M3LOGI Announcements'
                  : 'Courage Announcements'}
              </Text>
            </View>
            <FlatList
              contentContainerStyle={[CommonStyles.infoStarting]}
              data={getFilteredAnnouncements()}
              renderItem={({item}) => (
                <AnnouncementComponent announcement={item} />
              )}
              keyExtractor={(item, index) => item.name || index.toString()}
            />
          </>
        }
      />
      <AddAnnouncementModal
        isModalVisible={isAddAnnouncementModalVisible}
        toggleModal={toggleAddAnnouncementModal}
      />
    </CommonSafeAreaViewComponent>
  );
}
