import {useSelector} from 'react-redux';

const useLeaveData = () => {
  const {
    data: leaves,
    isLoading,
    allLeaves,
    error,
    leaveData,
    patchSuccess,
    userPaginatedLeaves,
    isLoadingUserPaginatedLeaves,
    userPaginatedError,
    allPaginatedLeaves,
    isLoadingAllPaginatedLeaves,
    allPaginatedError,
    noMoreAllRecords,
  } = useSelector(state => state.leaves);

  const validLeavesCount = leaves?.filter(leave => leave.name).length || 0;
  const validAllLeavesCount =
    allLeaves?.filter(leave => leave.name).length || 0;

  return {
    leaves,
    validLeavesCount,
    leavesLoading: isLoading,
    allLeaves,
    validAllLeavesCount,
    loadingPaginatedLeaves: isLoadingAllPaginatedLeaves,
    paginatedLeaves: allPaginatedLeaves,
    error,
    leaveData,
    patchSuccess,
    userPaginatedLeaves,
    isLoadingUserPaginatedLeaves,
    userPaginatedError,
    allPaginatedLeaves,
    isLoadingAllPaginatedLeaves,
    allPaginatedError,
    noMoreAllRecords,
  };
};

export default useLeaveData;
