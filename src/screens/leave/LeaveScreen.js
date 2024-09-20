import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import CommonSafeAreaViewComponent from '../../components/ReusableComponents/CommonSafeAreaViewComponent';
import Header from '../../components/ReusableComponents/Header/Header';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Constants from '../../components/common/Constants';
import {Colors} from '../../components/common/Colors';
import CustomerBackgroundComponent from '../../components/ReusableComponents/CustomerBackgroundComponent';
import CommonStyles from '../../components/common/CommonStyles';
import ProfileHeader from '../../components/ReusableComponents/Header/ProfileHeader';
import ImagePickerComponent from '../../components/ReusableComponents/ImagePickerComponent';
import TabBarHeader from '../../components/ReusableComponents/Header/TabBarHeader';
import styles from './styles';
import Pending from './types/Pending';
import Approved from './types/Approved';
import Rejected from './types/Rejected';

const tabs = [
  {
    id: 0,
    icon: 'calendar-outline',
    iconSet: Ionicons,
    color: Colors.yellowColor,
  },
  {
    id: 1,
    icon: 'calendar-outline',
    iconSet: Ionicons,
    color: Colors.greenColor,
  },
  {
    id: 2,
    icon: 'calendar-outline',
    iconSet: Ionicons,
    color: Colors.redColor,
  },
];

export default function LeaveScreen({navigation}) {
  const [activeTab, setActiveTab] = useState(0);
  const [image, setImage] = useState(null);
  const [isImagePickerOptionsVisible, setIsImagePickerOptionsVisible] =
    useState(false);

  const toggleImageOptionsModal = () => {
    setIsImagePickerOptionsVisible(!isImagePickerOptionsVisible);
  };
  const handleTabPress = index => {
    setActiveTab(index);
  };

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <CommonSafeAreaViewComponent>
      <Header
        title="Leaves"
        onLeftIconPressed={goBack}
        leftIcon={
          <Ionicons
            name="arrow-back"
            size={Constants?.SIZE.medIcon}
            color={Colors.whiteColor}
          />
        }
      />
      <CustomerBackgroundComponent
        topChild={
          <>
            <ProfileHeader
              image={image}
              toggleImageOptionsModal={toggleImageOptionsModal}
              name="Syed Ali Sultan Bukhari"
              role="Mobile App Developer"
              editable={false}
            />
          </>
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
                    <Pending />
                  ) : activeTab === 1 ? (
                    <Approved />
                  ) : activeTab === 2 ? (
                    <Rejected />
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
    </CommonSafeAreaViewComponent>
  );
}
