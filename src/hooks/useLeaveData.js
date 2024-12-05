import {useSelector} from 'react-redux';

const useLeaveData = () => {
  const {data: leaves, isLoading} = useSelector(state => state.leaves);
  const validLeavesCount = leaves?.filter(leave => leave.name).length || 0;
  return {leaves, validLeavesCount, leavesLoading: isLoading};
};

export default useLeaveData;
