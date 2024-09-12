import React, {useState} from 'react';

import CommonSafeAreaViewComponent from '../../components/ReusableComponents/CommonSafeAreaViewComponent';
import Header from '../../components/Header/Header';
import LogoutConfirmationComponent from '../../components/ReusableComponents/LogoutConfirmationComponent';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Constants from '../../components/common/Constants';
import {Colors} from '../../components/common/Colors';
import CommonStyles from '../../components/common/CommonStyles';
import {
  Image,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CustomerBackgroundComponent from '../../components/ReusableComponents/CustomerBackgroundComponent';
import {hp, wp} from '../../components/common/Dimensions';
import ImagePickerComponent from '../../components/ReusableComponents/ImagePickerComponent';
import styles from './styles';

// const tabs = [
//   {
//     id: 0,
//     icon: 'person-outline',
//     iconSize: Constants.SIZE.largeIcon,
//     iconColor: Colors.whiteColor,
//   },
//   {
//     id: 1,
//     icon: 'graduation',
//     iconSize: Constants.SIZE.largeIcon,
//     iconColor: Colors.whiteColor,
//   },
//   {
//     id: 2,
//     icon: 'briefcase',
//     iconSize: Constants.SIZE.medIcon,
//     iconColor: Colors.whiteColor,
//   },
// ];
const tabs = [
  {id: 0, icon: 'person-outline', iconSet: Ionicons},
  {id: 1, icon: 'graduation', iconSet: SimpleLineIcons},
  {id: 2, icon: 'briefcase', iconSet: SimpleLineIcons},
];

export default function ProfileScreen() {
  const handleLogout = LogoutConfirmationComponent();
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

  return (
    <CommonSafeAreaViewComponent>
      <Header
        title="Profile"
        onRightIconPressed={handleLogout}
        rightIcon={
          <Ionicons
            name="log-out-outline"
            size={Constants.SIZE.medIcon}
            color={Colors.blueColor}
          />
        }
      />
      <CustomerBackgroundComponent
        topChild={
          <View
            style={{
              paddingBottom: wp('5'),
              alignItems: 'center',
            }}>
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
                      size={Constants.SIZE.largeIcon} // Adjust size if needed
                      color={isActive ? Colors.whiteColor : Colors.blackColor}
                    />
                  </TouchableOpacity>
                );
              })}
            </View>

            <ScrollView
              style={styles.maxHeight}
              contentContainerStyle={[styles.infoStarting]}
              nestedScrollEnabled={true}
              showsVerticalScrollIndicator={true}>
              <Text
                style={[
                  CommonStyles.bold6,
                  CommonStyles.textBlack,
                  CommonStyles.marginTop2,
                ]}>
                Personal Info
              </Text>
              <View style={CommonStyles.paddingTop5}>
                <View style={CommonStyles.rowBetween}>
                  <Text
                    style={[
                      CommonStyles.font6,
                      CommonStyles.textBlack,
                      CommonStyles.lessBold300,
                    ]}>
                    Employee ID
                  </Text>
                  <Text
                    style={[
                      CommonStyles.font6,
                      CommonStyles.textBlack,
                      CommonStyles.Bold600,
                    ]}>
                    85
                  </Text>
                </View>
                <View style={CommonStyles.borderLineWithoutMargin} />
              </View>
              <View style={CommonStyles.paddingTop5}>
                <View style={CommonStyles.rowBetween}>
                  <Text
                    style={[
                      CommonStyles.font6,
                      CommonStyles.textBlack,
                      CommonStyles.lessBold300,
                    ]}>
                    Phone
                  </Text>
                  <Text
                    style={[
                      CommonStyles.font6,
                      CommonStyles.textBlack,
                      CommonStyles.Bold600,
                    ]}>
                    123456789
                  </Text>
                </View>
                <View style={CommonStyles.borderLineWithoutMargin} />
              </View>
              <View style={CommonStyles.paddingTop5}>
                <View style={CommonStyles.rowBetween}>
                  <Text
                    style={[
                      CommonStyles.font6,
                      CommonStyles.textBlack,
                      CommonStyles.lessBold300,
                    ]}>
                    Email
                  </Text>
                  <Text
                    style={[
                      CommonStyles.font6,
                      CommonStyles.textBlack,
                      CommonStyles.Bold600,
                    ]}>
                    ali@yahoo.com
                  </Text>
                </View>
                <View style={CommonStyles.borderLineWithoutMargin} />
              </View>
              <View style={CommonStyles.paddingTop5}>
                <View style={CommonStyles.rowBetween}>
                  <Text
                    style={[
                      CommonStyles.font6,
                      CommonStyles.textBlack,
                      CommonStyles.lessBold300,
                    ]}>
                    Birthday
                  </Text>
                  <Text
                    style={[
                      CommonStyles.font6,
                      CommonStyles.textBlack,
                      CommonStyles.Bold600,
                    ]}>
                    1989-01-01
                  </Text>
                </View>
                <View style={CommonStyles.borderLineWithoutMargin} />
              </View>
            </ScrollView>
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
