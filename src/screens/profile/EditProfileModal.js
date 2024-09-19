import {View, Text, Modal} from 'react-native';
import React, {useState} from 'react';
import CommonStyles from '../../components/common/CommonStyles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Constants from '../../components/common/Constants';
import {Colors} from '../../components/common/Colors';
import Header from '../../components/ReusableComponents/Header/Header';
import InputFieldComponent from '../../components/ReusableComponents/InputFieldComponent';
import CommonSafeAreaScrollViewComponent from '../../components/ReusableComponents/CommonSafeAreaScrollViewComponent';
import DateFromToComponent from '../../components/ReusableComponents/DateFromToComponent';
import CustomDatePickerComponent from '../../components/ReusableComponents/CustomDatePickerComponent';
import CustomPickerComponent from '../../components/ReusableComponents/CustomPickerComponent';
import {useCustomAlert} from '../../components/ReusableComponents/CustomAlertProvider';

export default function EditProfileModal({onClose, isModalVisible}) {
  const {showAlert} = useCustomAlert();

  //personal
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');
  const genderTypeOptions = ['Male', 'Female'];

  //educational
  const [degreeFrom, setDegreeFrom] = useState(null);
  const [degreeTo, setDegreeTo] = useState(null);
  const [institution, setInstitution] = useState('');
  const [degreeTitle, setDegreeTitle] = useState('');

  //job
  const [jobDesignation, setJobDesignation] = useState('');
  const [jobDepartment, setJobDepartment] = useState('');
  const [joiningDate, setJoiningDate] = useState(null);
  const [employmentType, setEmploymentType] = useState('');
  const [salary, setSalary] = useState('');
  const [wageType, setWageType] = useState('');
  const employmentTypeOptions = ['Full-time', 'Part-time', 'Contract'];
  const wageTypeOptions = ['Hourly', 'Salary', 'Commission'];

  const onTickPress = () => {
    showAlert({
      message: 'Are you sure you want to Logout?',
      title: 'Logout',
      button1: 'Yes',
      button2: 'No',
      onButton1: () => {
        onClose();
      },
    });
  };

  return (
    <Modal
      transparent={false}
      animationType="fade"
      visible={isModalVisible}
      onRequestClose={onClose}>
      <CommonSafeAreaScrollViewComponent>
        <Header
          title={'Edit Profile'}
          onLeftIconPressed={onClose}
          leftIcon={
            <Ionicons
              name="close"
              size={Constants?.SIZE.largeIcon}
              color={Colors.whiteColor}
            />
          }
          onRightIconPressed={onTickPress}
          rightIcon={
            <Ionicons
              name="checkmark"
              size={Constants?.SIZE.largeIcon}
              color={Colors.whiteColor}
            />
          }
        />

        <View style={CommonStyles.mainPadding}>
          <View style={[CommonStyles.alignSelf, CommonStyles.paddingBottom3]}>
            <Text
              style={[
                CommonStyles.font5p5,
                CommonStyles.Bold600,
                CommonStyles.textBlack,
                CommonStyles.underlineText,
              ]}>
              Personal Info
            </Text>
          </View>
          <>
            <InputFieldComponent
              title={'Full Name'}
              value={fullName}
              placeholder={'Enter Full Name'}
              placeholderColor={Colors.placeholderColorDark}
              onChangeText={text => setFullName(text)}
              borderColor={Colors.greyColor}
              textColor={Colors.blackColor}
            />
            <InputFieldComponent
              title={'Phone Number'}
              value={phoneNumber}
              placeholder={'Enter Phone Number'}
              placeholderColor={Colors.placeholderColorDark}
              onChangeText={text => setPhoneNumber(text)}
              borderColor={Colors.greyColor}
              textColor={Colors.blackColor}
              numeric={true}
            />
            <InputFieldComponent
              title={'Email Address'}
              value={emailAddress}
              placeholder={'Enter Email Address'}
              placeholderColor={Colors.placeholderColorDark}
              onChangeText={text => setEmailAddress(text)}
              borderColor={Colors.greyColor}
              textColor={Colors.blackColor}
              email={true}
            />

            <CustomDatePickerComponent
              selectedDate={dateOfBirth}
              setSelectedDate={setDateOfBirth}
              label="Date of Birth"
            />
            <CustomPickerComponent
              title={'Gender'}
              selectedValue={gender}
              setSelectedValue={setGender}
              options={genderTypeOptions}
            />
          </>
          <View style={[CommonStyles.alignSelf, CommonStyles.paddingBottom3]}>
            <Text
              style={[
                CommonStyles.font5p5,
                CommonStyles.Bold600,
                CommonStyles.textBlack,
                CommonStyles.underlineText,
              ]}>
              Latest Educational Info
            </Text>
          </View>
          <>
            <DateFromToComponent
              dateFrom={degreeFrom}
              setDateFrom={setDegreeFrom}
              dateTo={degreeTo}
              setDateTo={setDegreeTo}
            />
            <InputFieldComponent
              title={'Degree Title'}
              value={degreeTitle}
              placeholder={'Enter Degree Title'}
              placeholderColor={Colors.placeholderColorDark}
              onChangeText={text => setDegreeTitle(text)}
              borderColor={Colors.greyColor}
              textColor={Colors.blackColor}
            />
            <InputFieldComponent
              title={'Institution Name'}
              value={institution}
              placeholder={'Enter Institution Name'}
              placeholderColor={Colors.placeholderColorDark}
              onChangeText={text => setInstitution(text)}
              borderColor={Colors.greyColor}
              textColor={Colors.blackColor}
            />
          </>
          <View style={[CommonStyles.alignSelf, CommonStyles.paddingBottom3]}>
            <Text
              style={[
                CommonStyles.font5p5,
                CommonStyles.Bold600,
                CommonStyles.textBlack,
                CommonStyles.underlineText,
              ]}>
              Job Info
            </Text>
          </View>
          <>
            <InputFieldComponent
              title={'Designation'}
              value={jobDesignation}
              placeholder={'Enter Job Designation'}
              placeholderColor={Colors.placeholderColorDark}
              onChangeText={text => setJobDesignation(text)}
              borderColor={Colors.greyColor}
              textColor={Colors.blackColor}
            />
            <InputFieldComponent
              title={'Department'}
              value={jobDepartment}
              placeholder={'Enter Job Department'}
              placeholderColor={Colors.placeholderColorDark}
              onChangeText={text => setJobDepartment(text)}
              borderColor={Colors.greyColor}
              textColor={Colors.blackColor}
            />
            <CustomDatePickerComponent
              selectedDate={joiningDate}
              setSelectedDate={setJoiningDate}
              label="Joining Date"
            />

            <CustomPickerComponent
              title={'Employment Type'}
              selectedValue={employmentType}
              setSelectedValue={setEmploymentType}
              options={employmentTypeOptions}
            />
            <InputFieldComponent
              title={'Salary'}
              value={salary}
              placeholder={'Enter Salary'}
              placeholderColor={Colors.placeholderColorDark}
              onChangeText={text => setSalary(text)}
              borderColor={Colors.greyColor}
              textColor={Colors.blackColor}
              numeric={true}
            />

            <CustomPickerComponent
              title={'Wage Type'}
              selectedValue={wageType}
              setSelectedValue={setWageType}
              options={wageTypeOptions}
            />
          </>
        </View>
      </CommonSafeAreaScrollViewComponent>
    </Modal>
  );
}
