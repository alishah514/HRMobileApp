import {useSelector} from 'react-redux';

export const useAccountsData = () => {
  const isLoading = useSelector(state => state.accounts.isLoading);
  const isUpdating = useSelector(state => state.accounts.isUpdating);
  const specificUserData = useSelector(
    state => state.accounts.specificUserData,
  );
  const allUsersData = useSelector(state => state.accounts.allUsersData);

  const isDeleting = useSelector(state => state.accounts.isDeleting);

  return {
    isLoading,
    isUpdating,
    specificUserData,
    allUsersData,
    isDeleting,
  };
};
