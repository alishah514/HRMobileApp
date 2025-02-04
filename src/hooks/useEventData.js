import {useSelector} from 'react-redux';

export const useEventData = () => {
  const events = useSelector(state => state.events.data);
  const monthlyEvents = useSelector(state => state.events.monthlyData);
  const isLoading = useSelector(state => state.events.isLoading);

  return {
    events,
    monthlyEvents,
    isLoading,
  };
};
