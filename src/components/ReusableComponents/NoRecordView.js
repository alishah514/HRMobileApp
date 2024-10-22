import {View, Text, Image} from 'react-native';
import React from 'react';
import CommonStyles from '../common/CommonStyles';
import {useSelector} from 'react-redux';

export default function NoRecordView({errorMessage}) {
  const currentLanguage = useSelector(state => state.language.language);

  return (
    <View style={CommonStyles.noRecordMainView}>
      <Image
        source={require('../../../src/assets/icons/container-empty-icon.png')}
      />
      <Text style={CommonStyles.NoRecordText}>
        {errorMessage || 'No Record(s) Found!'}
      </Text>
    </View>
  );
}
