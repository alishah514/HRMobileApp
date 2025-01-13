import Constants from '../../../components/common/Constants';
import GenericApiComponent from '../GenericApiComponent';

const EventService = {
  fetchEvents: async () => {
    const url = `${Constants.FIREBASE_URL}/${Constants.EVENTS}?key=${Constants.FIREBASE_KEY}`;
    const method = 'get';
    const options = {resourceType: 'Event'};

    try {
      const response = await GenericApiComponent(url, method, null, options);
      return response;
    } catch (error) {
      throw error;
    }
  },

  postEvent: async eventData => {
    const url = `${Constants.FIREBASE_URL}/${Constants.EVENTS}?key=${Constants.FIREBASE_KEY}`;
    const method = 'post';
    const options = {resourceType: 'Event', postFlag: true};

    const body = {
      fields: {
        title: {stringValue: eventData.title},
        description: {stringValue: eventData.description},
        startDate: {timestampValue: eventData.startDate},
        endDate: {timestampValue: eventData.endDate},
        adminId: {stringValue: eventData.adminId},
        userId: {stringValue: eventData.userId},
      },
    };

    try {
      const response = await GenericApiComponent(url, method, body, options);
      return {success: true, response};
    } catch (error) {
      console.error('Error in EventService.postEvent:', error);
      return {
        success: false,
        error: error.message || 'An unexpected error occurred.',
      };
    }
  },

  patchEventStatus: async (eventId, eventData) => {
    const url = `${Constants.FIREBASE_URL}/${Constants.EVENTS}/${eventId}?key=${Constants.FIREBASE_KEY}`;
    const method = 'patch';
    const options = {resourceType: 'Event'};

    const body = {
      fields: {
        title: {stringValue: eventData.title},
        description: {stringValue: eventData.description},
        startDate: {timestampValue: eventData.startDate},
        endDate: {timestampValue: eventData.endDate},
        adminId: {stringValue: eventData.adminId},
        userId: {stringValue: eventData.userId},
      },
    };

    try {
      const response = await GenericApiComponent(url, method, body, options);
      return {success: true, response};
    } catch (error) {
      console.error('Error in EventService.patchEventStatus:', error);
      return {
        success: false,
        error: error.message || 'An unexpected error occurred.',
      };
    }
  },

  deleteEvent: async eventId => {
    const url = `${Constants.FIREBASE_URL}/${Constants.EVENTS}/${eventId}?key=${Constants.FIREBASE_KEY}`;
    const method = 'delete';
    const options = {resourceType: 'Event'};

    try {
      const response = await GenericApiComponent(url, method, null, options);
      if (response) {
        return {success: true, message: 'Event deleted successfully'};
      } else {
        return {success: false, error: 'Failed to delete event'};
      }
    } catch (error) {
      console.error('Error in EventService.deleteEvent:', error);
      return {
        success: false,
        error: error.message || 'An unexpected error occurred.',
      };
    }
  },

  fetchUserEvents: async userId => {
    const url = `${Constants.FIREBASE_POST_URL}key=${Constants.FIREBASE_KEY}`;
    const method = 'post';
    const options = {resourceType: 'Event'};

    const body = {
      structuredQuery: {
        from: [{collectionId: Constants.EVENTS}],
        where: {
          fieldFilter: {
            field: {fieldPath: 'userId'},
            op: 'EQUAL',
            value: {stringValue: userId},
          },
        },
      },
    };

    try {
      const response = await GenericApiComponent(url, method, body, options);
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default EventService;
