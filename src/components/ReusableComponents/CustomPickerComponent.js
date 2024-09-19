import {View, Text} from 'react-native';
import React from 'react';
import {Picker} from '@react-native-picker/picker';
import CommonStyles from '../common/CommonStyles';
import {Colors} from '../common/Colors';
import {wp} from '../common/Dimensions';

export default function CustomPickerComponent({
  title,
  selectedValue,
  setSelectedValue,
  options = [],
  placeholder = `Select ${title}`,
}) {
  return (
    <View style={CommonStyles.marginBottom5}>
      <Text style={[CommonStyles.lessBold3P5, CommonStyles.textBlue]}>
        {title}
      </Text>
      <View style={[CommonStyles.pickerContainer]}>
        <Picker
          selectedValue={selectedValue}
          onValueChange={itemValue => setSelectedValue(itemValue)}
          style={CommonStyles.InputFieldText}>
          <Picker.Item
            label={placeholder}
            value={null}
            color={Colors.greyColor}
            style={CommonStyles.textGrey}
          />
          {options.map((option, index) => (
            <Picker.Item
              key={index}
              label={option}
              value={option}
              style={CommonStyles.textBlack}
            />
          ))}
        </Picker>
      </View>
    </View>
  );
}
