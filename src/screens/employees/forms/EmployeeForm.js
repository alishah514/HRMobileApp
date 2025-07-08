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
import AttachmentPicker from '../../../components/ReusableComponents/AttachmentComponent';
import DocumentPicker, {types} from 'react-native-document-picker';
import {wp} from '../../../components/common/Dimensions';
import {handleDocumentUploadAWS} from '../../../components/utils/handleDocumentUploadAWS';
import {isSizeValid} from '../../../components/ReusableComponents/DocumentSizeComponent';
import LogoLoaderComponent from '../../../components/ReusableComponents/LogoLoaderComponent';

const EmployeeForm = forwardRef((props, ref) => {
  const phoneInputRef = useRef();

  const {onFormValidityChange, data, screen} = props;
  const currentLanguage = useSelector(state => state.language.language);
  const [isImagePickerOptionsVisible, setIsImagePickerOptionsVisible] =
    useState(false);
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [phoneTouched, setPhoneTouched] = useState(false);

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

  //documents
  const [cnicNumber, setCnicNumber] = useState('');
  const [cnicIssueDate, setCnicIssueDate] = useState(null);
  const [cnicExpiryDate, setCnicExpiryDate] = useState(null);
  const [cnicDocument, setCnicDocument] = useState(null);

  const [visaNumber, setVisaNumber] = useState('');
  const [visaIssueDate, setVisaIssueDate] = useState(null);
  const [visaExpiryDate, setVisaExpiryDate] = useState(null);
  const [visaDocument, setVisaDocument] = useState(null);

  const [residencyNumber, setResidencyNumber] = useState('');
  const [residencyIssueDate, setResidencyIssueDate] = useState(null);
  const [residencyExpiryDate, setResidencyExpiryDate] = useState(null);
  const [residencyDocument, setResidencyDocument] = useState(null);

  const [passportNumber, setPassportNumber] = useState('');
  const [passportIssueDate, setPassportIssueDate] = useState(null);
  const [passportExpiryDate, setPassportExpiryDate] = useState(null);
  const [passportDocument, setPassportDocument] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const handleDocumentPickFor = async type => {
    try {
      const result = await DocumentPicker.pickSingle({
        type: [
          DocumentPicker.types.pdf,
          DocumentPicker.types.doc,
          DocumentPicker.types.docx,
          DocumentPicker.types.plainText,
          DocumentPicker.types.images,
        ],
      });

      if (!isSizeValid(result)) {
        Alert.alert('File size error', 'File size must be less than 5 MB.');
        return;
      }

      showConfirmationAlert(async () => {
        setIsLoading(true);

        const uploadedUrl = await handleDocumentUploadAWS(
          result,
          `documents/${type}/`,
        );

        console.log(`Uploaded ${type} document URL:`, uploadedUrl);

        if (type === 'cnic') setCnicDocument(uploadedUrl);
        if (type === 'visa') setVisaDocument(uploadedUrl);
        if (type === 'residency') setResidencyDocument(uploadedUrl);
        if (type === 'passport') setPassportDocument(uploadedUrl);

        setIsLoading(false);
      });
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled document picker');
      } else {
        console.error('DocumentPicker Error:', err);
        Alert.alert(
          'Error',
          'An unexpected error occurred while selecting a document.',
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  const showConfirmationAlert = onConfirm => {
    Alert.alert(
      'Upload Confirmation',
      'Are you sure you want to upload this document?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: onConfirm,
        },
      ],
    );
  };

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
      const personal = data?.profile?.personal || {};
      const job = data?.profile?.job || {};
      const educationItem = data?.profile?.education?.[0] || {};
      const documents = data?.profile?.documents || {};
      const users = data?.users || {};

      setFullName(personal.fullName || '');
      const phone = personal.phone?.toString() || '';
      setPhoneNumber(phone && !phone.startsWith('+') ? `+${phone}` : phone);
      setEmailAddress(personal.email || '');
      setDateOfBirth(personal.birthDate || '');
      setGender(personal.gender || '');
      setProfilePicture(personal.imageUrl || null);
      setPassword(users.password || '');

      setDegreeFrom(educationItem.startDate || '');
      setDegreeTo(educationItem.endDate || '');
      setInstitution(educationItem.Institute || '');
      setDegreeTitle(educationItem.Degree || '');

      setJobDesignation(job.Designation || '');
      setJobDepartment(job.Department || '');
      setJoiningDate(job.JoiningDate || null);
      setEmploymentType(job.employmentType || '');
      setSalary(job.salary || '');
      setWageType(job.wageType || '');
      setPunchInTime(convertTo12HourFormat(job.punchInTime) || null);
      setPunchOutTime(convertTo12HourFormat(job.punchOutTime) || null);

      if (documents.cnic) {
        setCnicNumber(documents.cnic.number || '');
        setCnicIssueDate(documents.cnic.issueDate || null);
        setCnicExpiryDate(documents.cnic.expiryDate || null);
        setCnicDocument(documents.cnic.documentUrl || null);
      }

      if (documents.visa) {
        setVisaNumber(documents.visa.number || '');
        setVisaIssueDate(documents.visa.issueDate || null);
        setVisaExpiryDate(documents.visa.expiryDate || null);
        setVisaDocument(documents.visa.documentUrl || null);
      }

      if (documents.residency) {
        setResidencyNumber(documents.residency.number || '');
        setResidencyIssueDate(documents.residency.issueDate || null);
        setResidencyExpiryDate(documents.residency.expiryDate || null);
        setResidencyDocument(documents.residency.documentUrl || null);
      }
      if (documents.passport) {
        setPassportNumber(documents.passport.number || '');
        setPassportIssueDate(documents.passport.issueDate || null);
        setPassportExpiryDate(documents.passport.expiryDate || null);
        setPassportDocument(documents.passport.documentUrl || null);
      }
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
    if (!phoneTouched) return true;

    if (!phoneInputRef.current) return false;

    const fullPhoneNumber = phoneInputRef.current.getValue();
    const countryCode = phoneInputRef.current.getCountryCode();

    if (!countryCode) {
      setPhoneError(I18n.t('pleaseSelectCountryCode'));
      return false;
    }

    const numericCountryCode = countryCode.replace(/\D/g, '');
    if (!fullPhoneNumber.includes(`+${numericCountryCode}`)) {
      setPhoneError(I18n.t('pleaseSelectCountryCode'));
      return false;
    }

    const localNumber = fullPhoneNumber
      .replace(`+${numericCountryCode}`, '')
      .trim();

    if (!localNumber) {
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
      profilePicture &&
      // Documents
      cnicNumber &&
      cnicIssueDate &&
      cnicExpiryDate &&
      cnicDocument &&
      visaNumber &&
      visaIssueDate &&
      visaExpiryDate &&
      visaDocument &&
      residencyNumber &&
      residencyIssueDate &&
      residencyExpiryDate &&
      residencyDocument &&
      passportNumber &&
      passportIssueDate &&
      passportExpiryDate &&
      passportDocument;
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

    // Add these to dependencies
    cnicNumber,
    cnicIssueDate,
    cnicExpiryDate,
    cnicDocument,
    visaNumber,
    visaIssueDate,
    visaExpiryDate,
    visaDocument,
    residencyNumber,
    residencyIssueDate,
    residencyExpiryDate,
    residencyDocument,
    passportNumber,
    passportIssueDate,
    passportExpiryDate,
    passportDocument,
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
      // Documents
      cnicNumber,
      cnicIssueDate,
      cnicExpiryDate,
      cnicDocument,

      visaNumber,
      visaIssueDate,
      visaExpiryDate,
      visaDocument,

      residencyNumber,
      residencyIssueDate,
      residencyExpiryDate,
      residencyDocument,

      passportNumber,
      passportIssueDate,
      passportExpiryDate,
      passportDocument,
    }),
  }));

  useEffect(() => {
    if (phoneInputRef.current) {
      phoneInputRef.current.setValue(phoneNumber);
    }
  }, [phoneNumber]);

  return (
    <CommonSafeAreaScrollViewComponent>
      {isLoading && <LogoLoaderComponent />}
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
                if (!phoneTouched) setPhoneTouched(true);
                validatePhone();
              }}
              onSelectCountry={() => {
                setPhoneNumber('');
                setPhoneTouched(true);
                setPhoneError(I18n.t('phoneRequired'));
              }}
              style={[
                styles.phoneNumberStyle,
                {borderColor: phoneError ? Colors.redColor : Colors.greyColor},
              ]}
              textStyle={CommonStyles.InputField}
              pickerBackgroundColor={
                Platform.OS === 'android' ? Colors.blueColor : Colors.whiteColor
              }
              cancelTextStyle={styles.pickerTextStyle}
              confirmTextStyle={styles.pickerTextStyle}
              pickerItemStyle={CommonStyles.font5}
            />

            {phoneTouched && phoneError ? (
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
        <View style={[CommonStyles.alignSelf, CommonStyles.paddingBottom5]}>
          <Text
            style={[
              CommonStyles.font5P,
              CommonStyles.Bold600,
              CommonStyles.textBlack,
              CommonStyles.underlineText,
            ]}>
            {I18n.t('documents')}
          </Text>
        </View>

        <>
          <View>
            <InputFieldComponent
              title={I18n.t('cnicNumber')}
              value={cnicNumber}
              placeholder={I18n.t('enterCnicNumber')}
              placeholderColor={Colors.placeholderColorDark}
              onChangeText={text => {
                const cleaned = text.replace(/[^0-9]/g, '');
                setCnicNumber(cleaned);
              }}
              borderColor={Colors.greyColor}
              textColor={Colors.blackColor}
            />

            <DateFromToComponent
              dateFrom={formatDate(cnicIssueDate)}
              setDateFrom={setCnicIssueDate}
              dateTo={formatDate(cnicExpiryDate)}
              setDateTo={setCnicExpiryDate}
              dateFromLabel={I18n.t('issueDate')}
              dateToLabel={I18n.t('expiryDate')}
            />

            <AttachmentPicker
              attachment={cnicDocument}
              handleDocumentPick={() => handleDocumentPickFor('cnic')}
            />
          </View>

          <View style={CommonStyles.marginTop10}>
            <InputFieldComponent
              title={I18n.t('visaNumber')}
              value={visaNumber}
              placeholder={I18n.t('enterVisaNumber')}
              placeholderColor={Colors.placeholderColorDark}
              onChangeText={text => {
                const cleaned = text.replace(/[^0-9]/g, '');
                setVisaNumber(cleaned);
              }}
              borderColor={Colors.greyColor}
              textColor={Colors.blackColor}
            />

            <DateFromToComponent
              dateFrom={formatDate(visaIssueDate)}
              setDateFrom={setVisaIssueDate}
              dateTo={formatDate(visaExpiryDate)}
              setDateTo={setVisaExpiryDate}
              dateFromLabel={I18n.t('issueDate')}
              dateToLabel={I18n.t('expiryDate')}
            />

            <AttachmentPicker
              attachment={visaDocument}
              handleDocumentPick={() => handleDocumentPickFor('visa')}
            />
          </View>

          <View style={CommonStyles.marginTop10}>
            <InputFieldComponent
              title={I18n.t('residencyCardNumber')}
              value={residencyNumber}
              placeholder={I18n.t('enterResidencyNumber')}
              placeholderColor={Colors.placeholderColorDark}
              onChangeText={text => {
                const cleaned = text.replace(/[^0-9]/g, '');
                setResidencyNumber(cleaned);
              }}
              borderColor={Colors.greyColor}
              textColor={Colors.blackColor}
            />

            <DateFromToComponent
              dateFrom={formatDate(residencyIssueDate)}
              setDateFrom={setResidencyIssueDate}
              dateTo={formatDate(residencyExpiryDate)}
              setDateTo={setResidencyExpiryDate}
              dateFromLabel={I18n.t('issueDate')}
              dateToLabel={I18n.t('expiryDate')}
            />

            <AttachmentPicker
              attachment={residencyDocument}
              handleDocumentPick={() => handleDocumentPickFor('residency')}
            />
          </View>
          <View style={CommonStyles.marginTop10}>
            <InputFieldComponent
              title={I18n.t('passportNumber')}
              value={passportNumber}
              placeholder={I18n.t('enterPassportNumber')}
              placeholderColor={Colors.placeholderColorDark}
              onChangeText={text => {
                const cleaned = text.replace(/[^0-9]/g, '');
                setPassportNumber(cleaned);
              }}
              borderColor={Colors.greyColor}
              textColor={Colors.blackColor}
            />

            <DateFromToComponent
              dateFrom={formatDate(passportIssueDate)}
              setDateFrom={setPassportIssueDate}
              dateTo={formatDate(passportExpiryDate)}
              setDateTo={setPassportExpiryDate}
              dateFromLabel={I18n.t('issueDate')}
              dateToLabel={I18n.t('expiryDate')}
            />

            <AttachmentPicker
              attachment={passportDocument}
              handleDocumentPick={() => handleDocumentPickFor('passport')}
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
