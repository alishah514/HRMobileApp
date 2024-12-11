import {useSelector} from 'react-redux';

export const useAccountsData = () => {
  const isLoading = useSelector(state => state.accounts.isLoading);
  const isUpdating = useSelector(state => state.accounts.isUpdating);
  const specificUserData = useSelector(
    state => state.accounts.specificUserData,
  );

  return {
    isLoading,
    isUpdating,
    specificUserData,
  };
};
