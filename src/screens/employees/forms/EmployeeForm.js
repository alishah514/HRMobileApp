import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import CommonSafeAreaScrollViewComponent from '../../../components/ReusableComponents/CommonComponents/CommonSafeAreaScrollViewComponent';
import CommonStyles from '../../../components/common/CommonStyles';
import InputFieldComponent from '../../../components/ReusableComponents/InputFieldComponent';
import I18n from '../../../i18n/i18n';
import {useSelector} from 'react-redux';
import {Colors} from '../../../components/common/Colors';
import CustomSectionedMultiSelectComponent from '../../../components/ReusableComponents/CustomSectionedMultiSelectComponent';
import CustomDatePickerComponent from '../../../components/ReusableComponents/CustomDatePickerComponent';
import {formatDate} from '../../../components/utils/dateUtils';
import DateFromToComponent from '../../../components/ReusableComponents/DateFromToComponent';
import {PaymentRegex} from '../../../components/utils/PaymentRegex';
import {GenerateTimeOptions} from '../../../components/utils/GenerateTimeOptions';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Constants from '../../../components/common/Constants';
import styles from '../styles';
import ImagePickerComponent from '../../../components/ReusableComponents/ImagePickerComponent';
import {convertTo12HourFormat} from '../../../components/utils/ConvertTimeToInt';
import PhoneInput from 'react-native-phone-input';
import {wp} from '../../../components/common/Dimensions';

const EmployeeForm = forwardRef((props, ref) => {
  const phoneInputRef = useRef();

  const {onFormValidityChange, data, screen} = props;
  const currentLanguage = useSelector(state => state.language.language);
  const [isImagePickerOptionsVisible, setIsImagePickerOptionsVisible] =
    useState(false);
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  //personal
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);

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
  const [punchInTime, setPunchInTime] = useState(null);
  const [punchOutTime, setPunchOutTime] = useState(null);

  const employmentTypeOptions = [
    'Permanent',
    'Full-time',
    'Part-time',
    'Contract',
  ];
  const wageTypeOptions = ['Hourly', 'Monthly Based', 'Commission'];
  const [timeOptions, setTimeOptions] = useState([]);

  useEffect(() => {
    if (screen === 'edit' && data) {
      setFullName(data?.profile?.personal?.fullName || '');

      const phone = data?.profile?.personal?.phone?.toString() || '';

      if (phone && !phone.startsWith('+')) {
        setPhoneNumber(`+${phone}`);
      } else {
        setPhoneNumber(phone);
      }
      setEmailAddress(data?.profile?.personal?.email || '');
      setDateOfBirth(data?.profile?.personal?.birthDate || '');
      setGender(data?.profile?.personal?.gender || '');
      setProfilePicture(data?.profile?.personal?.imageUrl || null);
      setPassword(data?.users?.password || '');

      if (data?.profile?.education && data?.profile?.education.length > 0) {
        const educationItem = data?.profile?.education[0];

        setDegreeFrom(educationItem?.startDate || '');
        setDegreeTo(educationItem?.endDate || '');
        setInstitution(educationItem?.Institute || '');
        setDegreeTitle(educationItem?.Degree || '');
      }

      setJobDesignation(data?.profile?.job?.Designation || '');
      setJobDepartment(data?.profile?.job?.Department || '');
      setJoiningDate(data?.profile?.job?.JoiningDate || null);
      setEmploymentType(data?.profile?.job?.employmentType || '');
      setSalary(data?.profile?.job?.salary || '');
      setWageType(data?.profile?.job?.wageType || '');
      setPunchInTime(
        convertTo12HourFormat(data?.profile?.job?.punchInTime) || null,
      );
      setPunchOutTime(
        convertTo12HourFormat(data?.profile?.job?.punchOutTime) || null,
      );
    }
  }, [data, screen]);

  useEffect(() => {
    const options = GenerateTimeOptions(6, 5);
    setTimeOptions(options);
  }, []);

  const parseTime = timeString => {
    const [time, period] = timeString.split(' ');
    const [hours, minutes] = time.split(':').map(Number);
    let totalMinutes = (hours % 12) * 60 + minutes;
    if (period === 'PM') totalMinutes += 12 * 60;
    return totalMinutes;
  };

  const handleSetPunchOutTime = value => {
    if (punchInTime && parseTime(value) <= parseTime(punchInTime)) {
      Alert.alert(
        'Invalid Selection',
        'Punch-out time must be greater than punch-in time.',
      );
    } else if (!punchInTime) {
      Alert.alert('Invalid Selection', 'Please select Punch-in time first.');
    } else {
      setPunchOutTime(value);
    }
  };

  const toggleImageOptionsModal = () => {
    setIsImagePickerOptionsVisible(!isImagePickerOptionsVisible);
  };

  const validateEmail = email => {
    if (email === '') {
      setEmailError(I18n.t('emailRequired'));
      return false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError(I18n.t('emailInvalid'));
      return false;
    } else {
      setEmailError('');
      return true;
    }
  };

  const validatePhone = () => {
    if (!phoneInputRef.current) return false;

    const fullPhoneNumber = phoneInputRef.current.getValue();
    const countryCode = phoneInputRef.current.getCountryCode();

    if (!countryCode) {
      setPhoneError(I18n.t('pleaseSelectCountryCode'));
      return false;
    }

    const numericCountryCode = countryCode?.replace(/\D/g, '');

    if (!fullPhoneNumber?.includes(`+${numericCountryCode}`)) {
      setPhoneError(I18n.t('pleaseSelectCountryCode'));
      return false;
    }

    const localNumber = fullPhoneNumber
      .replace(`+${numericCountryCode}`, '')
      .trim();

    console.log('Full Phone:', fullPhoneNumber);
    console.log('Country Code:', countryCode);
    console.log('Local Number:', localNumber);

    if (!localNumber || localNumber === '') {
      setPhoneError(I18n.t('phoneRequired'));
      return false;
    } else if (localNumber.length < 8) {
      setPhoneError(I18n.t('phoneLengthMustBeGreaterThan8'));
      return false;
    } else if (localNumber.length > 14) {
      setPhoneError(I18n.t('phoneLengthMustBeLessThan14'));
      return false;
    } else {
      setPhoneError('');
      return true;
    }
  };

  useEffect(() => {
    const isEmailValid = validateEmail(emailAddress);
    const isPhoneValid = validatePhone(phoneNumber);

    const isFormValid =
      fullName &&
      isPhoneValid &&
      isEmailValid &&
      dateOfBirth &&
      gender &&
      password &&
      degreeFrom &&
      degreeTo &&
      institution &&
      degreeTitle &&
      jobDesignation &&
      jobDepartment &&
      joiningDate &&
      employmentType &&
      salary &&
      wageType &&
      punchInTime &&
      punchOutTime &&
      profilePicture;

    onFormValidityChange(isFormValid);
  }, [
    fullName,
    phoneNumber,
    emailAddress,
    dateOfBirth,
    gender,
    password,
    degreeFrom,
    degreeTo,
    institution,
    degreeTitle,
    jobDesignation,
    jobDepartment,
    joiningDate,
    employmentType,
    salary,
    wageType,
    punchInTime,
    punchOutTime,
    profilePicture,
    emailError,
    phoneError,
  ]);

  useImperativeHandle(ref, () => ({
    getFormData: () => ({
      fullName,
      phoneNumber,
      emailAddress,
      dateOfBirth,
      gender,
      profilePicture: profilePicture?.uploadedUrl || profilePicture,
      password,
      degreeFrom,
      degreeTo,
      institution,
      degreeTitle,
      jobDesignation,
      jobDepartment,
      joiningDate,
      employmentType,
      salary,
      wageType,
      punchInTime,
      punchOutTime,
    }),
  }));

  useEffect(() => {
    if (phoneInputRef.current) {
      phoneInputRef.current.setValue(phoneNumber);
    }
  }, [phoneNumber]);

  return (
    <CommonSafeAreaScrollViewComponent>
      <View style={CommonStyles.mainPadding}>
        <View style={CommonStyles.alignSelf}>
          <TouchableOpacity
            onPress={toggleImageOptionsModal}
            style={[styles.profilePicture]}>
            <Image
              source={
                typeof profilePicture === 'string' &&
                profilePicture.startsWith('http')
                  ? {uri: profilePicture}
                  : profilePicture?.path
                  ? {uri: profilePicture.path}
                  : require('../../../assets/images/man-emoji.png')
              }
              resizeMode="cover"
              style={
                (typeof profilePicture === 'string' &&
                  profilePicture.startsWith('http')) ||
                profilePicture?.path
                  ? CommonStyles.imageView
                  : styles.imageView
              }
            />

            <View style={styles.editPenIconCircle}>
              <SimpleLineIcons
                name={'pencil'}
                size={Constants.SIZE.xSmallIcon}
                color={Colors.whiteColor}
              />
            </View>
          </TouchableOpacity>

          <Text
            style={[
              CommonStyles.paddingVertical2,
              CommonStyles.font3P,
              CommonStyles.textBlack,
              CommonStyles.bold500,
            ]}>
            {' '}
            Upload Profile Picture{' '}
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
          <View style={styles.phoneNumberInput}>
            <Text
              style={[
                CommonStyles.lessBold3P5,
                CommonStyles.textBlue,
                CommonStyles.paddingBottom2,
              ]}>
              {I18n.t('phoneNumber')}
            </Text>

            <PhoneInput
              ref={phoneInputRef}
              initialCountry="us"
              value={phoneNumber}
              onChangePhoneNumber={value => {
                setPhoneNumber(value);
                validatePhone();
              }}
              onSelectCountry={() => {
                setPhoneNumber('');
                setPhoneError(I18n.t('phoneRequired'));
              }}
              style={[
                styles.phoneNumberStyle,
                {
                  borderColor: phoneError ? Colors.redColor : Colors.greyColor,
                },
              ]}
              textStyle={CommonStyles.InputField}
              pickerBackgroundColor={
                Platform.OS === 'android' ? Colors.blueColor : Colors.whiteColor
              }
              cancelTextStyle={styles.pickerTextStyle}
              confirmTextStyle={styles.pickerTextStyle}
              pickerItemStyle={CommonStyles.font5}
            />

            {phoneError ? (
              <Text style={styles.errorText}>{phoneError}</Text>
            ) : null}
          </View>

          <InputFieldComponent
            title={I18n.t('emailAddress')}
            value={emailAddress}
            placeholder={I18n.t('enterEmailAddress')}
            placeholderColor={Colors.placeholderColorDark}
            onChangeText={text => {
              setEmailAddress(text);
              validateEmail(text);
            }}
            borderColor={
              emailError && emailAddress.length !== 0
                ? Colors.redColor
                : Colors.greyColor
            }
            textColor={Colors.blackColor}
            email={true}
          />
          <InputFieldComponent
            title={I18n.t('password')}
            value={password}
            placeholder={I18n.t('enterYourPassword')}
            placeholderColor={Colors.placeholderColorDark}
            onChangeText={text => setPassword(text)}
            borderColor={Colors.greyColor}
            textColor={Colors.blackColor}
            isPassword={true}
          />

          <CustomDatePickerComponent
            selectedDate={formatDate(dateOfBirth)}
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
        <View style={[CommonStyles.alignSelf, CommonStyles.paddingBottom5]}>
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
            dateFrom={formatDate(degreeFrom)}
            setDateFrom={setDegreeFrom}
            dateTo={formatDate(degreeTo)}
            setDateTo={setDegreeTo}
            dateFromLabel={I18n.t('startDate')}
            dateToLabel={I18n.t('endDate')}
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

        <View style={[CommonStyles.alignSelf, CommonStyles.paddingBottom5]}>
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
            selectedDate={formatDate(joiningDate)}
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
            value={PaymentRegex(salary)}
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

          <View style={CommonStyles.rowBetween}>
            <CustomSectionedMultiSelectComponent
              title={I18n.t('punchInTime')}
              selectedValue={punchInTime}
              setSelectedValue={setPunchInTime}
              options={timeOptions}
              halfWidth={true}
              hideSearch={true}
            />
            <CustomSectionedMultiSelectComponent
              title={I18n.t('punchOutTime')}
              selectedValue={punchOutTime}
              setSelectedValue={handleSetPunchOutTime}
              options={timeOptions}
              halfWidth={true}
              hideSearch={true}
            />
          </View>
        </>
      </View>
      <ImagePickerComponent
        setImage={setProfilePicture}
        setIsImagePickerOptionsVisible={setIsImagePickerOptionsVisible}
        isImagePickerOptionsVisible={isImagePickerOptionsVisible}
        toggleImageOptionsModal={toggleImageOptionsModal}
        folder={'employee/profilePicture'}
      />
    </CommonSafeAreaScrollViewComponent>
  );
});
export default EmployeeForm;
