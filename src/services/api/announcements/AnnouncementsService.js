import Constants from '../../../components/common/Constants';
import GenericApiComponent from '../GenericApiComponent';

const AnnouncementsService = {
  fetchAnnouncements: async () => {
    const url = `${Constants.FIREBASE_URL}/${Constants.ANNOUNCEMENTS}?key=${Constants.FIREBASE_KEY}`;
    const method = 'get';
    const options = {resourceType: 'Announcement'};

    try {
      const response = await GenericApiComponent(url, method, null, options);
      return response;
    } catch (error) {
      throw error;
    }
  },

  postAnnouncement: async data => {
    const url = `${Constants.FIREBASE_URL}/${Constants.ANNOUNCEMENTS}?key=${Constants.FIREBASE_KEY}`;
    const method = 'post';
    const options = {
      resourceType: 'Announcement',
      postFlag: true,
    };

    const body = {
      fields: {
        title: {stringValue: data.title},
        content: {stringValue: data.message},
        creationDate: {timestampValue: data.creationDate},
        adminId: {stringValue: data.adminId},
        attachment: {stringValue: data.attachment},
      },
    };

    try {
      const response = await GenericApiComponent(url, method, body, options);
      return {success: true, response};
    } catch (error) {
      console.error('Error in AnnouncementsService.postAnnouncement:', error);
      return {
        success: false,
        error: error.message || 'An unexpected error occurred.',
      };
    }
  },

  patchAnnouncement: async (announcementId, data) => {
    const url = `${Constants.FIREBASE_URL}/${Constants.ANNOUNCEMENTS}/${announcementId}?key=${Constants.FIREBASE_KEY}`;
    const method = 'patch';
    const options = {
      resourceType: 'Announcement',
    };

    const body = {
      fields: {
        title: {stringValue: data.title},
        content: {stringValue: data.message},
        creationDate: {timestampValue: data.creationDate},
        adminId: {stringValue: data.adminId},
        attachment: {stringValue: data.attachment},
      },
    };

    try {
      const response = await GenericApiComponent(url, method, body, options);
      return {success: true, response};
    } catch (error) {
      console.error('Error in AnnouncementsService.patchAnnouncement:', error);
      return {
        success: false,
        error: error.message || 'An unexpected error occurred.',
      };
    }
  },

  deleteAnnouncement: async announcementId => {
    const url = `${Constants.FIREBASE_URL}/${Constants.ANNOUNCEMENTS}/${announcementId}?key=${Constants.FIREBASE_KEY}`;
    const method = 'delete';
    const options = {
      resourceType: 'Announcement',
    };

    try {
      const response = await GenericApiComponent(url, method, null, options);

      if (response) {
        return {success: true, message: 'Announcement deleted successfully'};
      } else {
        return {success: false, error: 'Failed to delete announcement'};
      }
    } catch (error) {
      console.error('Error in AnnouncementsService.deleteAnnouncement:', error);
      return {
        success: false,
        error: error.message || 'An unexpected error occurred.',
      };
    }
  },
};

export default AnnouncementsService;
