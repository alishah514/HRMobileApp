import {useSelector} from 'react-redux';

const useTaskData = () => {
  const {
    data: tasks,
    allTasks,
    isLoading,
    error,
    taskData,
    patchSuccess,
    allPaginatedTasks,
    isLoadingAllPaginatedTasks,
    allPaginatedError,
    userPaginatedTasks,
    isLoadingUserPaginatedTasks,
    userPaginatedError,
    noMoreAllRecords,
  } = useSelector(state => state.tasks);

  const validTaskCount = tasks?.filter(task => task.name).length || 0;
  const validAllTaskCount = allTasks?.filter(task => task.name).length || 0;
  const validUserTaskCount =
    userPaginatedTasks?.filter(task => task.name).length || 0;

  return {
    tasks,
    validTaskCount,
    tasksLoading: isLoading,
    allTasks,
    validAllTaskCount,
    error,
    taskData,
    patchSuccess,
    allPaginatedTasks,
    isLoadingAllPaginatedTasks,
    allPaginatedError,
    userPaginatedTasks,
    validUserTaskCount,
    isLoadingUserPaginatedTasks,
    userPaginatedError,
    noMoreAllRecords,
  };
};

export default useTaskData;
