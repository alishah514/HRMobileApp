import {Alert, Modal} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Header from '../../../components/ReusableComponents/Header/Header';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Constants from '../../../components/common/Constants';
import {Colors} from '../../../components/common/Colors';
import I18n from '../../../i18n/i18n';
import {useDispatch, useSelector} from 'react-redux';
import EmployeeForm from '../forms/EmployeeForm';
import {
  fetchAllProfile,
  fetchProfile,
  postProfile,
  updateProfile,
} from '../../../redux/profile/ProfileActions';
import LogoLoaderComponent from '../../../components/ReusableComponents/LogoLoaderComponent';
import {convertTo24HourFormat} from '../../../components/utils/ConvertTimeToInt';
import {
  clearSpecificUserData,
  getSpecificUser,
  updateOrEditUser,
} from '../../../redux/accounts/AccountActions';
import {createUser} from '../../../redux/signup/SignupActions';
import {useLoginData} from '../../../hooks/useLoginData';
import useProfileData from '../../../hooks/useProfileData';
import {useAccountsData} from '../../../hooks/useAccountsData';

export default function ManageEmployeeModal({
  isModalVisible,
  toggleModal,
  screen,
  data,
}) {
  const dispatch = useDispatch();
  const employeeFormRef = useRef();
  const currentLanguage = useSelector(state => state.language.language);
  const {isLoading, isUpdating, specificUserData} = useAccountsData();
  const {userId: currentUserId} = useLoginData();
  const {isPosting, isPatching} = useProfileData();
  const [isFormValid, setIsFormValid] = useState(false);
  const [mergedData, setMergedData] = useState({
    profile: data,
    users: specificUserData,
  });

  useEffect(() => {
    setMergedData({
      profile: data,
      users: specificUserData,
    });
  }, [data, specificUserData]);

  useEffect(() => {
    const userId = data?.userId;
    dispatch(getSpecificUser(userId));
  }, [data]);

  const validateForm = () => {
    const employeeData = employeeFormRef.current?.getFormData();
    let valid = true;

    if (
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
      employeeData.degreeTitle &&
      employeeData.punchInTime &&
      employeeData.punchOutTime &&
      employeeData.profilePicture &&
      employeeData.password
    ) {
      const email = employeeData.emailAddress;

      if (!/\S+@\S+\.\S+/.test(email)) {
        valid = false;
      }
    } else {
      valid = false;
    }

    return valid;
  };

  useEffect(() => {
    if (employeeFormRef.current) {
      setIsFormValid(validateForm());
    }
  }, [isModalVisible]);

  const onEditTickPress = async () => {
    if (isFormValid) {
      const employeeData = employeeFormRef.current.getFormData();
      const userData = buildUserData(employeeData);
      const userId = mergedData?.profile?.userId;
      const profileId = mergedData?.profile?.name?.split('/').pop();
      const profileData = buildProfileData(employeeData, userId);

      try {
        const response = await dispatch(updateOrEditUser(userId, userData));

        if (response.success) {
          await updateProfileData(profileId, profileData);
        } else {
          handleErrorResponse(response);
        }
      } catch (error) {
        handleUnexpectedError(error);
      } finally {
        toggleModal();
      }
    }
  };

  const onAddTickPress = async () => {
    if (isFormValid) {
      const employeeData = employeeFormRef.current.getFormData();
      const userData = buildUserData(employeeData);

      try {
        const response = await dispatch(createUser(userData));

        if (response?.name) {
          const userId = response.name.split('/').pop();
          const profileData = buildProfileData(employeeData, userId);

          try {
            const response = await dispatch(postProfile(profileData));

            if (response.success) {
              dispatch(fetchAllProfile());
              dispatch(fetchProfile(currentUserId));
            } else {
              handleErrorResponse(response);
            }
          } catch (error) {
            handleUnexpectedError(error);
          }
        } else {
          handleErrorResponse(response);
        }
      } catch (error) {
        handleUnexpectedError(error);
      } finally {
        toggleModal();
      }
    }
  };

  const buildUserData = employeeData => {
    return {
      name: employeeData.fullName,
      email: employeeData.emailAddress,
      password: employeeData.password,
      role: specificUserData?.role === 'Admin' ? 'Admin' : 'Employee',
    };
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

  const updateProfileData = async (profileId, profileData) => {
    try {
      const response = await dispatch(updateProfile(profileId, profileData));

      if (response.success) {
        Alert.alert('Success', 'Profile updated successfully.');
        dispatch(fetchAllProfile());
        dispatch(fetchProfile(currentUserId));
      } else {
        handleErrorResponse(response);
      }
    } catch (error) {
      handleUnexpectedError(error);
    }
  };

  const handleErrorResponse = response => {
    Alert.alert('Error', response.error || 'Operation failed.');
    console.error('Error in response:', response.error);
  };

  const handleUnexpectedError = error => {
    console.error('Unexpected error:', error);
    Alert.alert('Error', error.message || 'An unexpected error occurred.');
  };

  const onRightIconPressed = () => {
    if (!isFormValid) {
      Alert.alert('Incomplete Form', 'Please complete all fields!');
      return;
    }

    const actionType = screen === 'add' ? 'add' : 'edit';
    const actionFunction = screen === 'add' ? onAddTickPress : onEditTickPress;

    showConfirmationAlert(actionType, actionFunction);
  };

  const showConfirmationAlert = (actionType, onConfirm) => {
    const message =
      actionType === 'add'
        ? 'Are you sure you want to add this user?'
        : 'Are you sure you want to edit this profile?';

    Alert.alert(
      'Confirm Action',
      message,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: onConfirm,
        },
      ],
      {cancelable: false},
    );
  };

  const onCancelModal = () => {
    dispatch(clearSpecificUserData());
    toggleModal();
  };

  return (
    <Modal
      transparent={false}
      animationType="fade"
      visible={isModalVisible}
      onRequestClose={toggleModal}>
      <Header
        title={
          screen === 'add' ? I18n.t('addEmployee') : I18n.t('editEmployee')
        }
        onLeftIconPressed={onCancelModal}
        leftIcon={
          <Ionicons
            name="close"
            size={Constants.SIZE.largeIcon}
            color={Colors.whiteColor}
          />
        }
        onRightIconPressed={onRightIconPressed}
        rightIcon={
          <Ionicons
            name="checkmark"
            size={Constants.SIZE.largeIcon}
            color={isFormValid ? Colors.whiteColor : Colors.blueColor}
          />
        }
      />
      {(isPosting || isLoading || isUpdating || isPatching) && (
        <LogoLoaderComponent />
      )}
      <EmployeeForm
        ref={employeeFormRef}
        onFormValidityChange={setIsFormValid}
        data={mergedData}
        screen={screen}
      />
    </Modal>
  );
}
