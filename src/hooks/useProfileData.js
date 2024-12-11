import {useSelector} from 'react-redux';

const useProfileData = () => {
  const {
    data: profile,
    allProfileData: allProfile,
    isLoading,
    isPatching,
    isPosting,
  } = useSelector(state => state.profile);

  return {
    profile,
    allProfile,
    profileLoading: isLoading,
    isPatching,
    isPosting,
  };
};

export default useProfileData;
