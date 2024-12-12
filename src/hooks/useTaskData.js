import {useSelector} from 'react-redux';

const useTaskData = () => {
  const {data: tasks, isLoading, allTasks} = useSelector(state => state.tasks);
  const validTaskCount = tasks?.filter(task => task.name).length || 0;
  const validAllTaskCount = allTasks?.filter(task => task.name).length || 0;

  return {
    tasks,
    validTaskCount,
    tasksLoading: isLoading,
    allTasks,
    validAllTaskCount,
  };
};

export default useTaskData;
