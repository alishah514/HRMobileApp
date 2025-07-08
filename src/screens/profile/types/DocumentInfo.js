import {View, Text, TouchableOpacity, Linking} from 'react-native';
import React, {useEffect} from 'react';
import CommonStyles from '../../../components/common/CommonStyles';
import {useSelector} from 'react-redux';
import I18n from '../../../i18n/i18n';
import {formatDate} from '../../../components/utils/dateUtils';
import NoRecordView from '../../../components/ReusableComponents/NoRecordView';
import {Colors} from '../../../components/common/Colors';
import {TruncateTitle} from '../../../components/utils/TruncateTitle';
import {wp} from '../../../components/common/Dimensions';

export default function DocumentInfo({data}) {
  const currentLanguage = useSelector(state => state.language.language);

  if (!data || Object.keys(data).length === 0) {
    return (
      <View style={CommonStyles.height100}>
        <NoRecordView errorMessage={'No Record Found'} />
      </View>
    );
  }

  useEffect(() => {
    console.log('data:', data);
  }, [data]);

  const openUrl = async url => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        console.log("Don't know how to open URI: " + url);
      }
    } catch (error) {
      console.error('Failed to open URL:', error);
    }
  };

  return (
    <View>
      <Text
        style={[
          CommonStyles.bold6,
          CommonStyles.textBlack,
          CommonStyles.marginTop2,
        ]}>
        {I18n.t('documents')}
      </Text>

      <View style={CommonStyles.paddingTop5}>
        {Object.entries(data).map(([docType, doc]) => (
          <View key={docType} style={{marginBottom: wp(3)}}>
            <Text
              style={[
                CommonStyles.font5P,
                CommonStyles.textPrimary,
                CommonStyles.Bold600,
                {textTransform: 'capitalize', textDecorationLine: 'underline'},
              ]}>
              {docType}
            </Text>

            <View>
              <View style={CommonStyles.paddingTop5}>
                <View style={CommonStyles.rowBetween}>
                  <Text
                    style={[
                      CommonStyles.font5,
                      CommonStyles.textBlack,
                      CommonStyles.lessBold300,
                    ]}>
                    {I18n.t('document')}:
                  </Text>
                  <TouchableOpacity
                    onPress={() => openUrl(doc.documentUrl)}
                    style={[CommonStyles.flexRow, CommonStyles.centerView]}>
                    <Text
                      style={[
                        CommonStyles.font5,
                        CommonStyles.textBlue,
                        CommonStyles.Bold600,
                        CommonStyles.paddingRight1,
                      ]}>
                      Show Document
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={CommonStyles.paddingTop5}>
                <View style={CommonStyles.rowBetween}>
                  <Text
                    style={[
                      CommonStyles.font5,
                      CommonStyles.textBlack,
                      CommonStyles.lessBold300,
                    ]}>
                    {I18n.t('number')}:
                  </Text>
                  <View style={[CommonStyles.flexRow, CommonStyles.centerView]}>
                    <Text
                      style={[
                        CommonStyles.font5,
                        CommonStyles.textBlack,
                        CommonStyles.Bold600,
                        CommonStyles.paddingRight1,
                      ]}>
                      {doc.number || '-'}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={CommonStyles.paddingTop5}>
                <View style={CommonStyles.rowBetween}>
                  <Text
                    style={[
                      CommonStyles.font5,
                      CommonStyles.textBlack,
                      CommonStyles.lessBold300,
                    ]}>
                    {I18n.t('issueDate')}:
                  </Text>
                  <View style={[CommonStyles.flexRow, CommonStyles.centerView]}>
                    <Text
                      style={[
                        CommonStyles.font5,
                        CommonStyles.textBlack,
                        CommonStyles.Bold600,
                        CommonStyles.paddingRight1,
                      ]}>
                      {formatDate(doc.issueDate) || '-'}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={CommonStyles.paddingTop5}>
                <View style={CommonStyles.rowBetween}>
                  <Text
                    style={[
                      CommonStyles.font5,
                      CommonStyles.textBlack,
                      CommonStyles.lessBold300,
                    ]}>
                    {I18n.t('expiryDate')}:
                  </Text>
                  <View style={[CommonStyles.flexRow, CommonStyles.centerView]}>
                    <Text
                      style={[
                        CommonStyles.font5,
                        CommonStyles.textBlack,
                        CommonStyles.Bold600,
                        CommonStyles.paddingRight1,
                      ]}>
                      {formatDate(doc.expiryDate) || '-'}
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={CommonStyles.borderLineWithoutMargin} />
          </View>
        ))}
      </View>
    </View>
  );
}
