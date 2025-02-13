import {View, Text, Image} from 'react-native';
import React from 'react';
import styles from '../styles';
import CommonStyles from '../../../components/common/CommonStyles';
import I18n from '../../../i18n/i18n';
import {useSelector} from 'react-redux';
import {getGreetingMessage} from '../../../components/ReusableComponents/GreetingMessageComponent';

export default function WishComponent({data}) {
  const currentLanguage = useSelector(state => state.language.language);

  const {greeting, wish} = getGreetingMessage();

  return (
    <View style={[styles.rowTitle]}>
      <View style={CommonStyles.width70}>
        <Text style={[CommonStyles.bold5, CommonStyles.textWhite]}>
          {I18n.t(greeting)}!
        </Text>
        <View style={CommonStyles.paddingTop2}>
          <Text style={[CommonStyles.bold5, CommonStyles.textWhite]}>
            {data?.personal?.fullName}
          </Text>
          <Text
            style={[
              CommonStyles.lessBold4,
              CommonStyles.textWhite,
              CommonStyles.paddingTop1,
            ]}>
            {I18n.t(wish)}
          </Text>
        </View>
      </View>
      <Image
        source={require('../../../assets/images/sun.png')}
        style={styles.logoIcon}
      />
    </View>
  );
}
