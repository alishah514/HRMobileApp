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

  const hasMore = useSelector(state => state.announcements.hasMore);

  return {
    announcements,
    paginatedAnnouncements,
    isLoading,
    loadingPaginatedAnnouncements,
    error,
    paginatedError,
    hasMore,
  };
};
