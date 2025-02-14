import {useSelector} from 'react-redux';

const useProfileData = () => {
  const {
    data: profile,
    allProfileData: allProfile,
    isLoading,
    isPatching,
    isPosting,
    isDeleting,
  } = useSelector(state => state.profile);

  return {
    profile,
    allProfile,
    profileLoading: isLoading,
    isPatching,
    isPosting,
    isDeleting,
  };
};

export default useProfileData;
