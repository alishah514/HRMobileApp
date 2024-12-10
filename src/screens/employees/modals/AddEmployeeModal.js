import {Alert, Modal} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Header from '../../../components/ReusableComponents/Header/Header';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Constants from '../../../components/common/Constants';
import {Colors} from '../../../components/common/Colors';
import I18n from '../../../i18n/i18n';
import {useDispatch, useSelector} from 'react-redux';
import EmployeeForm from '../forms/EmployeeForm';
import {useLoginData} from '../../../hooks/useLoginData';
import {
  fetchAllProfile,
  postProfile,
} from '../../../redux/profile/ProfileActions';
import {signupUser} from '../../../redux/signup/SignupActions';
import LogoLoaderComponent from '../../../components/ReusableComponents/LogoLoaderComponent';
import {convertTo24HourFormat} from '../../../components/utils/ConvertTimeToInt';

export default function AddEmployeeModal({isModalVisible, toggleModal}) {
  const dispatch = useDispatch();
  const currentLanguage = useSelector(state => state.language.language);
  const employeeFormRef = useRef();
  const {userId} = useLoginData();
  const [isFormValid, setIsFormValid] = useState(false);
  const isPosting = useSelector(state => state.profile.isPosting);

  const validateForm = () => {
    const employeeData = employeeFormRef.current?.getFormData();
    return (
      employeeData &&
      employeeData.fullName &&
      employeeData.phoneNumber &&
      employeeData.emailAddress &&
      employeeData.dateOfBirth &&
      employeeData.gender &&
      employeeData.jobDesignation &&
      employeeData.jobDepartment &&
      employeeData.joiningDate &&
      employeeData.employmentType &&
      employeeData.salary &&
      employeeData.wageType &&
      employeeData.degreeFrom &&
      employeeData.degreeTo &&
      employeeData.institution &&
      employeeData.degreeTitle
    );
  };

  useEffect(() => {
    if (employeeFormRef.current) {
      setIsFormValid(validateForm());
    }
  }, [isModalVisible]);

  const onTickPress = async () => {
    if (isFormValid) {
      const employeeData = employeeFormRef.current.getFormData();
      console.log('Employee Data:', employeeData);

      const userData = {
        name: employeeData.fullName,
        email: employeeData.emailAddress,
        password: employeeData.password,
        role: 'Employee',
      };

      try {
        const response = await createUser(userData);

        if (!response || !response.name) {
          Alert.alert(
            'Error',
            'User creation failed, no userId found in response',
          );
          return;
        }

        const userId = response.name.split('/').pop();

        const profileData = buildProfileData(employeeData, userId);

        await postUserProfile(profileData);
      } catch (error) {
        console.error('Error in onTickPress:', error);
        Alert.alert('Error', error.message || 'An unexpected error occurred.');
      } finally {
        toggleModal();
      }
    }
  };

  const createUser = async userData => {
    try {
      const response = await dispatch(signupUser(userData));
      return response;
    } catch (error) {
      console.error('Error in createUser:', error);
      throw error;
    }
  };

  const buildProfileData = (employeeData, userId) => {
    return {
      personal: {
        fullName: employeeData.fullName,
        phone: employeeData.phoneNumber,
        email: employeeData.emailAddress,
        birthDate: employeeData.dateOfBirth,
        gender: employeeData.gender,
        imageUrl: employeeData.profilePicture,
      },
      job: {
        Designation: employeeData.jobDesignation,
        Department: employeeData.jobDepartment,
        JoiningDate: employeeData.joiningDate,
        employmentType: employeeData.employmentType,
        salary: employeeData.salary,
        wageType: employeeData.wageType,
        punchInTime: convertTo24HourFormat(employeeData.punchInTime),
        punchOutTime: convertTo24HourFormat(employeeData.punchOutTime),
      },
      education: [
        {
          startDate: employeeData.degreeFrom,
          Institute: employeeData.institution,
          Degree: employeeData.degreeTitle,
          endDate: employeeData.degreeTo,
        },
      ],
      userId: userId,
    };
  };

  const postUserProfile = async profileData => {
    try {
      const response = await dispatch(postProfile(profileData));

      if (response.success) {
        Alert.alert('Profile has been posted successfully');
        dispatch(fetchAllProfile());
      } else {
        console.error('Failed to post profile data:', response.error);
      }
    } catch (error) {
      console.error('Error in postUserProfile:', error);
      throw error;
    }
  };

  return (
    <Modal
      transparent={false}
      animationType="fade"
      visible={isModalVisible}
      onRequestClose={toggleModal}>
      <Header
        title={I18n.t('addEmployee')}
        onLeftIconPressed={toggleModal}
        leftIcon={
          <Ionicons
            name="close"
            size={Constants.SIZE.largeIcon}
            color={Colors.whiteColor}
          />
        }
        onRightIconPressed={
          isFormValid
            ? onTickPress
            : () =>
                Alert.alert('Incomplete Form', 'Please complete all fields!')
        }
        rightIcon={
          <Ionicons
            name="checkmark"
            size={Constants.SIZE.largeIcon}
            color={isFormValid ? Colors.whiteColor : Colors.blueColor}
          />
        }
      />
      {isPosting && <LogoLoaderComponent />}
      <EmployeeForm
        ref={employeeFormRef}
        onFormValidityChange={setIsFormValid}
        // setIsImageLoading={setIsImageLoading}
      />
    </Modal>
  );
}
