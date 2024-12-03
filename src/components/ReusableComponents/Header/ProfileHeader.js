import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {Colors} from '../../../components/common/Colors';
import Constants from '../../../components/common/Constants';
import CommonStyles from '../../../components/common/CommonStyles';

export default function ProfileHeader({
  image,
  toggleImageOptionsModal,
  name,
  role,
  editable = false,
}) {
  return (
    <View style={CommonStyles.paddingBottom5Align}>
      {editable ? (
        <TouchableOpacity
          onPress={toggleImageOptionsModal}
          style={CommonStyles.imageCircle}>
          <View style={CommonStyles.editPenIconCircle}>
            <SimpleLineIcons
              name={'pencil'}
              size={Constants.SIZE.smallIcon}
              color={Colors.whiteColor}
            />
          </View>
          {image ? (
            <Image
              source={{uri: image}}
              resizeMode="cover"
              style={CommonStyles.imageView}
            />
          ) : (
            <Ionicons
              name={'person'}
              size={Constants.SIZE.xxLargeIcon}
              color={Colors.silverColor}
            />
          )}
        </TouchableOpacity>
      ) : (
        <View style={CommonStyles.imageCircle}>
          {image ? (
            <Image
              source={{uri: image}}
              resizeMode="cover"
              style={CommonStyles.imageView}
            />
          ) : (
            <Ionicons
              name={'person'}
              size={Constants.SIZE.xxLargeIcon}
              color={Colors.silverColor}
            />
          )}
        </View>
      )}

      <View style={CommonStyles.alignItemsCenter}>
        <Text
          style={[
            CommonStyles.bold6,
            CommonStyles.textWhite,
            CommonStyles.marginTop2,
          ]}>
          {name}
        </Text>
        <Text style={[CommonStyles.font5, CommonStyles.textWhite]}>{role}</Text>
      </View>
    </View>
  );
}
