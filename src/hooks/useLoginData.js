import {useSelector} from 'react-redux';

export const useLoginData = () => {
  const userId = useSelector(state => state.login.userId);
  const role = useSelector(state => state.login.role);

  return {userId, role};
};
