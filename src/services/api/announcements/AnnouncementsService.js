import Constants from '../../../components/common/Constants';
import AnnouncementsApiComponent from './AnnouncementsApiComponent';

const AnnouncementsService = {
  fetchAnnouncements: async () => {
    const url = `${Constants.FIREBASE_URL}/${Constants.ANNOUNCEMENTS}?key=${Constants.FIREBASE_KEY}`;
    const method = 'get';

    try {
      const response = await AnnouncementsApiComponent(url, method);
      return response;
    } catch (error) {
      throw error;
    }
  },

  postAnnouncement: async data => {
    const url = `${Constants.FIREBASE_URL}/${Constants.ANNOUNCEMENTS}?key=${Constants.FIREBASE_KEY}`;
    const method = 'post';
    const body = {
      fields: {
        title: {
          stringValue: data.title,
        },
        content: {
          stringValue: data.message,
        },
        creationDate: {
          timestampValue: data.creationDate,
        },
        adminId: {
          stringValue: data.adminId,
        },

        attachment: {
          stringValue: data.attachment,
        },
      },
    };

    try {
      const response = await AnnouncementsApiComponent(url, method, body, true);

      return {success: true, response};
    } catch (error) {
      console.error('Error in TaskService.postTask:', error);
      return {
        success: false,
        error: error.message || 'An unexpected error occurred.',
      };
    }
  },
};

export default AnnouncementsService;
