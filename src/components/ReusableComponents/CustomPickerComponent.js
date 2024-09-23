import {View, Text, TouchableOpacity, Modal, Platform} from 'react-native';
import React, {useState} from 'react';
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
  const [modalVisible, setModalVisible] = useState(false);
  const [tempSelectedValue, setTempSelectedValue] = useState(selectedValue); // Temporary state

  return (
    <View style={CommonStyles.marginBottom5}>
      <Text
        style={[
          CommonStyles.lessBold3P5,
          CommonStyles.textBlue,
          Platform.OS === 'ios' && CommonStyles.marginBottom2,
        ]}>
        {title}
      </Text>
      <TouchableOpacity
        style={CommonStyles.pickerContainer}
        onPress={() => setModalVisible(true)}>
        <Text
          style={[
            CommonStyles.InputFieldText,
            {
              color:
                !selectedValue || selectedValue === 'null'
                  ? Colors.placeholderColorDark
                  : Colors.blackColor,
            },
          ]}>
          {!selectedValue || selectedValue === 'null'
            ? placeholder
            : selectedValue}
        </Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={CommonStyles.pickerMainContainer}>
          <View style={CommonStyles.pickerMainContainerBox}>
            <TouchableOpacity style={CommonStyles.pickerTopHeader}>
              <Text style={[CommonStyles.bold5, CommonStyles.textWhite]}>
                {placeholder}
              </Text>
            </TouchableOpacity>
            <View style={CommonStyles.pickerView}>
              <Picker
                selectedValue={tempSelectedValue}
                onValueChange={itemValue => {
                  setTempSelectedValue(itemValue);
                }}>
                <Picker.Item
                  label={placeholder}
                  value={null}
                  color={Colors.greyColor}
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
            <View
              style={[CommonStyles.pickerBottomHeader, CommonStyles.flexRow]}>
              <TouchableOpacity
                style={{
                  width: '50%',
                  backgroundColor: Colors.redColor,
                  alignSelf: 'flex-start',
                  height: '100%',
                  borderBottomLeftRadius: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => setModalVisible(false)}>
                <Text style={[CommonStyles.bold5, CommonStyles.textWhite]}>
                  Close
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: '50%',
                  backgroundColor: Colors.blueColor,
                  alignSelf: 'flex-end',
                  height: '100%',
                  borderBottomRightRadius: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => {
                  setSelectedValue(tempSelectedValue); // Update the main selected value
                  setModalVisible(false);
                }}>
                <Text style={[CommonStyles.bold5, CommonStyles.textWhite]}>
                  Done
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
