import {View, Text, FlatList} from 'react-native';
import React from 'react';
import CommonStyles from '../../../components/common/CommonStyles';
import CommonButton from '../../../components/ReusableComponents/CommonComponents/CommonButton';
import styles from '../styles';
import {useSelector} from 'react-redux';
import I18n from '../../../i18n/i18n';

export default function TimeLine({data, time}) {
  const currentLanguage = useSelector(state => state.language.language);

  return (
    <>
      <View style={CommonStyles.height80}>
        <View style={styles.verticalLine} />

        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <View style={[styles.itemContainer, CommonStyles.alignItemsCenter]}>
              <View style={styles.leftContainer}>
                <View style={[styles.dot, CommonStyles.backgroundYellow]} />
              </View>
              <View
                style={[
                  CommonStyles.rowBetween,
                  CommonStyles.alignItemsCenter,
                ]}>
                <View
                  style={[
                    styles.boxRecord,
                    CommonStyles.rowBetween,
                    CommonStyles.shadow,
                  ]}>
                  <View style={[CommonStyles.alignItemsCenter]}>
                    <Text
                      style={[CommonStyles.lessBold4P, CommonStyles.textBlack]}>
                      {I18n.t('punchIn')}
                    </Text>
                    <Text
                      style={[
                        CommonStyles.bold4P,
                        CommonStyles.textBlack,
                        CommonStyles.paddingTop2,
                      ]}>
                      {item.punchIn || '---'}
                    </Text>
                  </View>
                  <View style={[CommonStyles.alignItemsCenter]}>
                    <Text
                      style={[CommonStyles.lessBold4P, CommonStyles.textBlack]}>
                      {I18n.t('punchOut')}
                    </Text>
                    <Text
                      style={[
                        CommonStyles.bold4P,
                        CommonStyles.textBlack,
                        CommonStyles.paddingTop2,
                      ]}>
                      {item.punchOut || '---'}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          )}
        />
      </View>

      <CommonButton
        title={time ? `${time} ${I18n.t('hours')}` : 'Pending'}
        outlined={true}
      />
    </>
  );
}
