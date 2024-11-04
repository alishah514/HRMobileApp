import {View, Text, Platform} from 'react-native';
import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CommonStyles from '../common/CommonStyles';
import {Colors} from '../common/Colors';
import Constants from '../common/Constants';
import {useSelector} from 'react-redux';
import {TruncateTitle} from '../utils/TruncateTitle';

export default function CustomDrawerComponent(props) {
  const {data: profile} = useSelector(state => state.profile);

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
            <Ionicons
              name="person"
              size={Constants.SIZE.xLargeIcon}
              color={Colors.whiteColor}
            />
          </View>
          <View style={CommonStyles.padding3}>
            <View>
              <Text style={[CommonStyles.bold3p5, CommonStyles.textWhite]}>
                {TruncateTitle(profile?.personal?.fullName, 22)}
              </Text>
            </View>
            <View style={CommonStyles.paddingTop1}>
              <Text style={[CommonStyles.lessBold3, CommonStyles.textWhite]}>
                {TruncateTitle(profile?.personal?.email, 22)}
              </Text>
            </View>
            <View style={CommonStyles.paddingTop1}>
              <Text style={[CommonStyles.lessBold3, CommonStyles.textWhite]}>
                {TruncateTitle(profile?.job?.Designation, 22)}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}
