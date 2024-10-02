import React from 'react';
import {View, Text, Platform} from 'react-native';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CommonStyles from '../common/CommonStyles';
import {Colors} from '../common/Colors';
import {wp} from '../common/Dimensions';
import Constants from '../common/Constants';
import I18n from '../../i18n/i18n';
import {useSelector} from 'react-redux';

export default function CustomSectionedMultiSelectComponent({
  title,
  selectedValue,
  setSelectedValue,
  options = [],
  placeholder = `${I18n.t('select')} ${title}`,
  hideSearch = false,
  halfWidth,
  multiple = false,
}) {
  const currentLanguage = useSelector(state => state.language);

  const items = options.map((option, index) => ({
    id: index,
    name: option,
  }));

  return (
    <View
      style={[
        CommonStyles.marginBottom5,
        {
          width: halfWidth ? '45%' : '100%',
        },
      ]}>
      <Text
        style={[
          CommonStyles.lessBold3P5,
          CommonStyles.textBlue,
          Platform.OS === 'ios' && CommonStyles.marginBottom2,
        ]}>
        {title}
      </Text>

      <SectionedMultiSelect
        items={items}
        uniqueKey="id"
        displayKey="name"
        single={!multiple}
        confirmText={I18n.t('confirm')}
        hideSearch={options?.length < 20 ? true : hideSearch}
        selectText={multiple && selectedValue?.length > 0 ? '' : placeholder}
        showCancelButton={true}
        onSelectedItemsChange={selectedItems => {
          if (multiple) {
            if (selectedItems.length === 0) {
              setSelectedValue([]);
            } else {
              setSelectedValue(
                selectedItems.map(
                  id => items.find(item => item.id === id).name,
                ),
              );
            }
          } else {
            setSelectedValue(
              selectedItems.length > 0
                ? items.find(item => item.id === selectedItems[0])?.name
                : null,
            );
          }
        }}
        selectedItems={
          selectedValue && multiple
            ? selectedValue.map(
                val => items.find(item => item.name === val)?.id,
              )
            : selectedValue
            ? [items.find(item => item.name === selectedValue)?.id]
            : []
        }
        IconRenderer={() => (
          <MaterialIcons
            name={
              multiple && selectedValue?.length > 0
                ? 'cancel'
                : 'keyboard-arrow-down'
            }
            color={Colors.blackColor}
            size={Constants.SIZE.smallIcon}
            style={CommonStyles.marginHor2}
          />
        )}
        cancelIconComponent={() => (
          <MaterialIcons
            name={'cancel'}
            color={Colors.whiteColor}
            size={Constants.SIZE.smallIcon}
          />
        )}
        searchIconComponent={() => (
          <MaterialIcons
            name={'search'}
            color={Colors.blackColor}
            size={Constants.SIZE.smallIcon}
            style={CommonStyles.paddingHor3}
          />
        )}
        selectedIconComponent={() => (
          <MaterialIcons
            name={'check'}
            color={Colors.blackColor}
            size={Constants.SIZE.smallIcon}
          />
        )}
        colors={{
          searchPlaceholderTextColor: Colors.greyColor,
          chipColor: Colors.blueColor,
          itemBackground: Colors.whiteColor,
        }}
        styles={{
          container: {
            marginVertical: options.length > 20 ? wp('40') : wp('60'),
            paddingTop: options?.length < 20 && wp('2'),
          },
          selectToggle: {
            borderBottomWidth:
              multiple && selectedValue?.length > 0 ? 0 : wp('0.15'),
            borderColor: Colors.greyColor,
            paddingBottom: wp('2'),
          },
          selectToggleText: {
            color:
              selectedValue && selectedValue.length > 0
                ? Colors.blackColor
                : Colors.placeholderColorDark,
            fontSize: wp('4'),
            fontWeight: '500',
          },
          selectedItemText: {
            color: Colors.blueColor,
          },
          itemText: {
            fontSize: wp('4'),
            fontWeight: '500',
          },
          subItem: {
            paddingVertical: wp('3'),
          },
          button: {
            backgroundColor: Colors.blueColor,
          },
          cancelButton: {
            backgroundColor: Colors.redColor,
          },
          listContainer: {
            height: '40%',
            width: '90%',
          },
        }}
      />
    </View>
  );
}
