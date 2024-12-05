import {useSelector} from 'react-redux';

const useTaskData = () => {
  const {data: tasks, isLoading} = useSelector(state => state.tasks);
  const validTaskCount = tasks?.filter(task => task.name).length || 0;
  return {tasks, validTaskCount, tasksLoading: isLoading};
};

export default useTaskData;
