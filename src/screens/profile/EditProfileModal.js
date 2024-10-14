import {View, Text, Modal} from 'react-native';
import React, {useState} from 'react';
import CommonStyles from '../../components/common/CommonStyles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Constants from '../../components/common/Constants';
import {Colors} from '../../components/common/Colors';
import Header from '../../components/ReusableComponents/Header/Header';
import InputFieldComponent from '../../components/ReusableComponents/InputFieldComponent';
import CommonSafeAreaScrollViewComponent from '../../components/ReusableComponents/CommonComponents/CommonSafeAreaScrollViewComponent';
import DateFromToComponent from '../../components/ReusableComponents/DateFromToComponent';
import CustomDatePickerComponent from '../../components/ReusableComponents/CustomDatePickerComponent';
import {useSelector} from 'react-redux';
import I18n from '../../i18n/i18n';
import CustomSectionedMultiSelectComponent from '../../components/ReusableComponents/CustomSectionedMultiSelectComponent';

export default function EditProfileModal({onClose, isModalVisible}) {
  const currentLanguage = useSelector(state => state.language.language);

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
    onClose();
  };

  return (
    <Modal
      transparent={false}
      animationType="fade"
      visible={isModalVisible}
      onRequestClose={onClose}>
      <CommonSafeAreaScrollViewComponent>
        <Header
          title={I18n.t('editProfile')}
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
                CommonStyles.font5P,
                CommonStyles.Bold600,
                CommonStyles.textBlack,
                CommonStyles.underlineText,
              ]}>
              {I18n.t('personalInfo')}
            </Text>
          </View>
          <>
            <InputFieldComponent
              title={I18n.t('fullName')}
              value={fullName}
              placeholder={I18n.t('enterFullName')}
              placeholderColor={Colors.placeholderColorDark}
              onChangeText={text => setFullName(text)}
              borderColor={Colors.greyColor}
              textColor={Colors.blackColor}
            />
            <InputFieldComponent
              title={I18n.t('phoneNumber')}
              value={phoneNumber}
              placeholder={I18n.t('enterPhoneNumber')}
              placeholderColor={Colors.placeholderColorDark}
              onChangeText={text => setPhoneNumber(text)}
              borderColor={Colors.greyColor}
              textColor={Colors.blackColor}
              numeric={true}
            />
            <InputFieldComponent
              title={I18n.t('emailAddress')}
              value={emailAddress}
              placeholder={I18n.t('enterEmailAddress')}
              placeholderColor={Colors.placeholderColorDark}
              onChangeText={text => setEmailAddress(text)}
              borderColor={Colors.greyColor}
              textColor={Colors.blackColor}
              email={true}
            />

            <CustomDatePickerComponent
              selectedDate={dateOfBirth}
              setSelectedDate={setDateOfBirth}
              label={I18n.t('dateOfBirth')}
            />

            <CustomSectionedMultiSelectComponent
              title={I18n.t('gender')}
              selectedValue={gender}
              setSelectedValue={setGender}
              options={genderTypeOptions}
            />
          </>
          <View style={[CommonStyles.alignSelf, CommonStyles.paddingBottom3]}>
            <Text
              style={[
                CommonStyles.font5P,
                CommonStyles.Bold600,
                CommonStyles.textBlack,
                CommonStyles.underlineText,
              ]}>
              {I18n.t('latestEducationalInfo')}
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
              title={I18n.t('degreeTitle')}
              value={degreeTitle}
              placeholder={I18n.t('enterDegreeTitle')}
              placeholderColor={Colors.placeholderColorDark}
              onChangeText={text => setDegreeTitle(text)}
              borderColor={Colors.greyColor}
              textColor={Colors.blackColor}
            />
            <InputFieldComponent
              title={I18n.t('institutionName')}
              value={institution}
              placeholder={I18n.t('enterInstitutionName')}
              placeholderColor={Colors.placeholderColorDark}
              onChangeText={text => setInstitution(text)}
              borderColor={Colors.greyColor}
              textColor={Colors.blackColor}
            />
          </>
          <View style={[CommonStyles.alignSelf, CommonStyles.paddingBottom3]}>
            <Text
              style={[
                CommonStyles.font5P,
                CommonStyles.Bold600,
                CommonStyles.textBlack,
                CommonStyles.underlineText,
              ]}>
              {I18n.t('jobInfo')}
            </Text>
          </View>
          <>
            <InputFieldComponent
              title={I18n.t('designation')}
              value={jobDesignation}
              placeholder={I18n.t('enterJobDesignation')}
              placeholderColor={Colors.placeholderColorDark}
              onChangeText={text => setJobDesignation(text)}
              borderColor={Colors.greyColor}
              textColor={Colors.blackColor}
            />
            <InputFieldComponent
              title={I18n.t('department')}
              value={jobDepartment}
              placeholder={I18n.t('enterJobDepartment')}
              placeholderColor={Colors.placeholderColorDark}
              onChangeText={text => setJobDepartment(text)}
              borderColor={Colors.greyColor}
              textColor={Colors.blackColor}
            />
            <CustomDatePickerComponent
              selectedDate={joiningDate}
              setSelectedDate={setJoiningDate}
              label={I18n.t('joiningDate')}
            />

            <CustomSectionedMultiSelectComponent
              title={I18n.t('employmentType')}
              selectedValue={employmentType}
              setSelectedValue={setEmploymentType}
              options={employmentTypeOptions}
            />
            <InputFieldComponent
              title={I18n.t('salary')}
              value={salary}
              placeholder={I18n.t('enterSalary')}
              placeholderColor={Colors.placeholderColorDark}
              onChangeText={text => setSalary(text)}
              borderColor={Colors.greyColor}
              textColor={Colors.blackColor}
              numeric={true}
            />

            <CustomSectionedMultiSelectComponent
              title={I18n.t('wageType')}
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
