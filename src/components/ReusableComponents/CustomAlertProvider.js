import React, {createContext, useContext, useState} from 'react';
import {Modal, View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import CommonStyles from '../common/CommonStyles';
import {wp} from '../common/Dimensions';
import {Colors} from '../common/Colors';
import Constants from '../common/Constants';

const CustomAlertContext = createContext();

export const CustomAlertProvider = ({children}) => {
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertConfig, setAlertConfig] = useState({
    title: '',
    message: '',
    onSuccess: null,
    code: '',
    result: null,
    button1: '',
    button2: '',
    onButton1: null,
    onButton2: null,
    error: false,
  });

  const showAlert = ({
    title,
    message,
    onSuccess,
    code,
    result,
    button1,
    button2,
    onButton1,
    onButton2,
    error,
  }) => {
    setAlertConfig({
      title,
      message,
      onSuccess,
      code,
      result,
      button1,
      button2,
      onButton1,
      onButton2,
      error,
    });
    setAlertVisible(true);
  };

  const hideAlert = () => {
    setAlertVisible(false);
    if (alertConfig.onSuccess) {
      alertConfig.onSuccess();
    }
  };

  const onButtonPress = flag => {
    hideAlert();
    if (flag === 1) {
      if (alertConfig.onButton1) {
        alertConfig.onButton1();
      }
    } else {
      if (alertConfig.onButton2) {
        alertConfig.onButton2();
      }
    }
  };

  return (
    <CustomAlertContext.Provider value={{showAlert}}>
      {children}
      <Modal
        transparent={true}
        animationType="slide"
        visible={alertVisible}
        onRequestClose={hideAlert}>
        <View style={CommonStyles.centeredView}>
          <View style={styles.modalView}>
            <View
              style={[
                styles.headerView,
                {
                  backgroundColor: alertConfig.error
                    ? Colors.redColor
                    : alertConfig.title
                    ? Colors.blueColor
                    : alertConfig.code === 200
                    ? Colors.successGreenColor
                    : Colors.redColor,
                },
              ]}>
              <View style={CommonStyles.width10} />
              <Text style={styles.modalText}>
                {alertConfig.title
                  ? alertConfig.title
                  : alertConfig.code === 200
                  ? 'Success'
                  : 'Error'}
              </Text>
              <TouchableOpacity
                style={CommonStyles.paddingHor3}
                onPress={hideAlert}>
                <AntDesign
                  name="close"
                  size={Constants?.SIZE.medIcon}
                  color={Colors.whiteColor}
                />
              </TouchableOpacity>
            </View>
            <View style={CommonStyles.paddingTop3}>
              <Text style={styles.modalText2}>{alertConfig.message}</Text>
            </View>
            {alertConfig.button1 && alertConfig.onButton1 && (
              <TouchableOpacity
                onPress={() => onButtonPress(1)}
                style={[
                  CommonStyles.alertButton,
                  alertConfig.error
                    ? CommonStyles.redButtonAlert
                    : CommonStyles.blueButtonAlert,
                  CommonStyles.marginBottom3,
                ]}>
                <Text style={CommonStyles.whiteText5}>
                  {alertConfig.button1}
                </Text>
              </TouchableOpacity>
            )}
            {alertConfig.button2 && (
              <TouchableOpacity
                onPress={() => onButtonPress(2)}
                style={[
                  CommonStyles.alertButton,
                  CommonStyles.whiteBackground,
                  {borderWidth: 1},
                ]}>
                <Text style={CommonStyles.blackText5}>
                  {alertConfig.button2}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </Modal>
    </CustomAlertContext.Provider>
  );
};

export const useCustomAlert = () => useContext(CustomAlertContext);

const styles = StyleSheet.create({
  headerView: {
    minWidth: wp('60'),
    height: wp('12'),
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalView: {
    minWidth: wp('60'),
    minHeight: wp('30'),
    paddingBottom: wp('5'),
    backgroundColor: Colors.whiteColor,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    textAlign: 'center',
    fontSize: wp('5'),
    fontWeight: '600',
    color: Colors.whiteColor,
  },
  modalText2: {
    textAlign: 'center',
    fontSize: wp('4.5'),
    color: Colors.blackColor,
    maxWidth: wp('60'),

    paddingHorizontal: wp('3'),
  },
});
