import {View, Text, Platform, Image} from 'react-native';
import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CommonStyles from '../common/CommonStyles';
import {Colors} from '../common/Colors';
import Constants from '../common/Constants';
import {TruncateTitle} from '../utils/TruncateTitle';
import useProfileData from '../../hooks/useProfileData';
import {useLoginData} from '../../hooks/useLoginData';

export default function CustomDrawerComponent(props) {
  const {profile} = useProfileData();
  const {role} = useLoginData();

  return (
    <DrawerContentScrollView
      {...props}
      style={{
        backgroundColor: props.backgroundColor,
      }}
      contentContainerStyle={{
        paddingTop: Platform.OS === 'ios' && 0,
      }}>
      <View
        style={[
          CommonStyles.margin5,
          {backgroundColor: props.backgroundColor},
        ]}>
        <View style={CommonStyles.flexRow}>
          <View style={CommonStyles.dpView}>
            {profile?.personal?.imageUrl &&
            profile?.personal?.imageUrl !== 'null' ? (
              <Image
                source={{uri: profile.personal.imageUrl}}
                style={CommonStyles.dpView}
              />
            ) : (
              <Ionicons
                name="person"
                size={Constants.SIZE.xLargeIcon}
                color={Colors.whiteColor}
              />
            )}
          </View>
          <View style={CommonStyles.padding3}>
            <View>
              <Text style={[CommonStyles.bold3p5, CommonStyles.textWhite]}>
                {TruncateTitle(profile?.personal?.fullName, 22)}
              </Text>
            </View>

            <View style={CommonStyles.paddingTop1}>
              <Text style={[CommonStyles.lessBold3, CommonStyles.textWhite]}>
                {TruncateTitle(role, 22)}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}
