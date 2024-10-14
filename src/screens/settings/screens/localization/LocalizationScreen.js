import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import CommonSafeAreaViewComponent from '../../../../components/ReusableComponents/CommonComponents/CommonSafeAreaViewComponent';
import Header from '../../../../components/ReusableComponents/Header/Header';
import {Colors} from '../../../../components/common/Colors';
import Constants from '../../../../components/common/Constants';
import CustomerBackgroundComponent from '../../../../components/ReusableComponents/CustomerBackgroundComponent';
import CommonStyles from '../../../../components/common/CommonStyles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CommonButton from '../../../../components/ReusableComponents/CommonComponents/CommonButton';
import CustomSectionedMultiSelectComponent from '../../../../components/ReusableComponents/CustomSectionedMultiSelectComponent';

import I18n from '../../../../i18n/i18n';
import {setLanguage} from '../../../../redux/language/LanguageActions';

export default function LocalizationScreen({navigation}) {
  const dispatch = useDispatch();
  const currentLanguage = useSelector(state => state.language.language);
  const [selectedLanguage, setSelectedLanguage] = useState(
    currentLanguage || 'English',
  );
  const languageOptions = ['English', 'Japanese'];

  const goBack = () => {
    navigation.goBack();
  };

  const handleChangeLanguage = async () => {
    dispatch(setLanguage(selectedLanguage));
    I18n.locale = selectedLanguage === 'Japanese' ? 'ja' : 'en';
    goBack();
  };

  return (
    <CommonSafeAreaViewComponent>
      <Header
        title={I18n.t('changeLanguage')}
        onLeftIconPressed={goBack}
        leftIcon={
          <Ionicons
            name="arrow-back"
            size={Constants.SIZE.medIcon}
            color={Colors.whiteColor}
          />
        }
      />
      <CustomerBackgroundComponent
        topVerySmall
        topChild={
          <View style={CommonStyles.width90}>
            <Text style={[CommonStyles.lessBold5P, CommonStyles.textWhite]}>
              {I18n.t('changeYourLanguage')}
            </Text>
          </View>
        }
        bottomChild={
          <View
            style={[
              CommonStyles.width90,
              CommonStyles.alignSelf,
              CommonStyles.marginTop10,
            ]}>
            <CustomSectionedMultiSelectComponent
              title={I18n.t('language')}
              selectedValue={selectedLanguage}
              setSelectedValue={setSelectedLanguage}
              options={languageOptions}
            />
            <View style={CommonStyles.paddingVertical2} />
            <CommonButton
              title={I18n.t('changeLanguage')}
              onPress={handleChangeLanguage}
            />
          </View>
        }
      />
    </CommonSafeAreaViewComponent>
  );
}
