import {useSelector} from 'react-redux';

export const useAnnouncementData = () => {
  const announcements = useSelector(state => state.announcements.announcements);
  const paginatedAnnouncements = useSelector(
    state => state.announcements.paginatedAnnouncements,
  );

  const isLoading = useSelector(state => state.announcements.isLoading);
  const loadingPaginatedAnnouncements = useSelector(
    state => state.announcements.loadingPaginatedAnnouncements,
  );

  const error = useSelector(state => state.announcements.error);
  const paginatedError = useSelector(
    state => state.announcements.paginatedError,
  );

  const postSuccess = useSelector(state => state.announcements.postSuccess);
  const patchSuccess = useSelector(state => state.announcements.patchSuccess);
  const deleteSuccess = useSelector(state => state.announcements.deleteSuccess);

  const noMoreAllRecords = useSelector(
    state => state.announcements.noMoreAllRecords,
  );

  return {
    announcements,
    paginatedAnnouncements,
    isLoading,
    loadingPaginatedAnnouncements,
    error,
    paginatedError,
    postSuccess,
    patchSuccess,
    deleteSuccess,
    noMoreAllRecords,
  };
};
