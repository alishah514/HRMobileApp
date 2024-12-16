import {useSelector} from 'react-redux';

export const useEventData = () => {
  const events = useSelector(state => state.events.data);
  const isLoading = useSelector(state => state.events.isLoading);

  return {
    events,
    isLoading,
  };
};
