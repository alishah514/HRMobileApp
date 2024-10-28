import {View, Text, FlatList} from 'react-native';
import React from 'react';
import CommonStyles from '../../../../components/common/CommonStyles';

import {useSelector} from 'react-redux';
import I18n from '../../../../i18n/i18n';
import styles from './styles';
import NoRecordView from '../../../../components/ReusableComponents/NoRecordView';

export default function EducationInfo({data}) {
  const currentLanguage = useSelector(state => state.language.language);

  if (!data || Object.keys(data).length === 0) {
    return (
      <View style={CommonStyles.height100}>
        <NoRecordView errorMessage={'No Record Found'} />
      </View>
    );
  }

  const getYearFromDate = dateString => {
    const date = new Date(dateString);
    return date.getFullYear();
  };

  return (
    <View>
      <Text
        style={[
          CommonStyles.bold6,
          CommonStyles.textBlack,
          CommonStyles.marginTop2,
        ]}>
        {I18n.t('educationalInfo')}
      </Text>
      <View style={CommonStyles.paddingTop5} />

      <View>
        <View style={styles.verticalLine} />
        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => (
            <View style={styles.itemContainer}>
              <View style={styles.leftContainer}>
                <View style={styles.dot} />
              </View>
              <View style={styles.rightContainer}>
                <Text style={styles.year}>
                  {getYearFromDate(item?.StartDate)} -{' '}
                  {getYearFromDate(item?.EndDate)}
                </Text>
                <Text style={styles.title}>{item?.Institute}</Text>
                <Text style={styles.description}>{item?.Degree}</Text>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
}
