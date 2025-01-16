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
import CommonStyles from '../../components/common/CommonStyles';
import CustomerBackgroundComponent from '../../components/ReusableComponents/CustomerBackgroundComponent';
import AnnouncementComponent from './components/AnnouncementComponent';
import {fetchAllAnnouncements} from '../../redux/announcements/AnnouncementActions';
import styles from './styles';
import AddAnnouncementModal from './modals/AddAnnouncemenModal';
import LogoLoaderComponent from '../../components/ReusableComponents/LogoLoaderComponent';
import NoRecordView from '../../components/ReusableComponents/NoRecordView';
import {useAnnouncementData} from '../../hooks/useAnnouncementData';

export default function AnnouncementScreen({navigation}) {
  const dispatch = useDispatch();
  // const {announcements, isLoading} = useSelector(state => state.announcements);
  const {announcements, isLoading} = useAnnouncementData();
  const {role} = useLoginData();
  const [isAddAnnouncementModalVisible, setIsAddAnnouncementModalVisible] =
    useState(false);

  useEffect(() => {
    dispatch(fetchAllAnnouncements());
  }, [dispatch]);

  const handleDrawerOpen = () => {
    navigation.openDrawer();
  };

  const toggleAddAnnouncementModal = () => {
    setIsAddAnnouncementModalVisible(!isAddAnnouncementModalVisible);
  };

  const getFilteredAnnouncements = () => {
    return announcements.sort(
      (a, b) => new Date(b.creationDate) - new Date(a.creationDate),
    );
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
          <FlatList
            style={styles.flatListStyle}
            contentContainerStyle={[CommonStyles.infoStarting]}
            data={getFilteredAnnouncements()}
            renderItem={({item}) => {
              return <AnnouncementComponent announcement={item} />;
            }}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={
              <View style={CommonStyles.height100}>
                <NoRecordView errorMessage={'No Record Found'} />
              </View>
            }
          />
        }
      />
      <AddAnnouncementModal
        isModalVisible={isAddAnnouncementModalVisible}
        toggleModal={toggleAddAnnouncementModal}
      />
    </CommonSafeAreaViewComponent>
  );
}
