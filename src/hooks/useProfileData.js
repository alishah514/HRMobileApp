import {useSelector} from 'react-redux';

const useProfileData = () => {
  const {
    data: profile,
    allProfileData: allProfile,
    isLoading,
  } = useSelector(state => state.profile);
  return {profile, allProfile, profileLoading: isLoading};
};

export default useProfileData;
