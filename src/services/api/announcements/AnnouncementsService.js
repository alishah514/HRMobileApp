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

  patchAnnouncement: async (announcementId, data) => {
    console.log('announcementId, data', announcementId, data);

    const url = `${Constants.FIREBASE_URL}/${Constants.ANNOUNCEMENTS}/${announcementId}?key=${Constants.FIREBASE_KEY}`;
    const method = 'patch';

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
      const response = await AnnouncementsApiComponent(url, method, body);
      return {success: true, response};
    } catch (error) {
      console.error('Error in Announcement Service.patchAnnouncement:', error);
      return {
        success: false,
        error: error.message || 'An unexpected error occurred.',
      };
    }
  },

  deleteAnnouncement: async announcementId => {
    const url = `${Constants.FIREBASE_URL}/${Constants.ANNOUNCEMENTS}/${announcementId}?key=${Constants.FIREBASE_KEY}`;
    const method = 'DELETE';

    try {
      const response = await AnnouncementsApiComponent(url, method);

      if (response) {
        return {success: true, message: 'Announcement deleted successfully'};
      } else {
        return {success: false, error: 'Failed to delete announcement'};
      }
    } catch (error) {
      console.error('Error in Announcement Service.deleteAnnouncement:', error);
      return {
        success: false,
        error: error.message || 'An unexpected error occurred.',
      };
    }
  },
};

export default AnnouncementsService;
