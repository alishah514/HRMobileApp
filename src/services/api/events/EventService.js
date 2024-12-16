import Constants from '../../../components/common/Constants';
import EventApiComponent from './EventApiComponent';

const EventService = {
  fetchEvents: async () => {
    const url = `${Constants.FIREBASE_URL}/${Constants.EVENTS}?key=${Constants.FIREBASE_KEY}`;
    const method = 'get';

    try {
      const response = await EventApiComponent(url, method);
      return response;
    } catch (error) {
      throw error;
    }
  },

  postEvent: async eventData => {
    const url = `${Constants.FIREBASE_URL}/${Constants.EVENTS}?key=${Constants.FIREBASE_KEY}`;
    const method = 'post';
    const body = {
      fields: {
        title: {
          stringValue: eventData.title,
        },
        description: {
          stringValue: eventData.description,
        },
        startDate: {
          timestampValue: eventData.startDate,
        },
        endDate: {
          timestampValue: eventData.endDate,
        },
        adminId: {
          stringValue: eventData.adminId,
        },
        userId: {
          stringValue: eventData.userId,
        },
      },
    };

    try {
      const response = await EventApiComponent(url, method, body, true);
      return {success: true, response};
    } catch (error) {
      console.error('Error in EventService.postEventRequest:', error);
      return {
        success: false,
        error: error.message || 'An unexpected error occurred.',
      };
    }
  },

  patchEventStatus: async (eventId, eventData) => {
    const url = `${Constants.FIREBASE_URL}/${Constants.EVENTS}/${eventId}?key=${Constants.FIREBASE_KEY}`;
    const method = 'patch';
    const body = {
      fields: {
        title: {
          stringValue: eventData.title,
        },
        description: {
          stringValue: eventData.description,
        },
        startDate: {
          timestampValue: eventData.startDate,
        },
        endDate: {
          timestampValue: eventData.endDate,
        },
        adminId: {
          stringValue: eventData.adminId,
        },
        userId: {
          stringValue: eventData.userId,
        },
      },
    };

    try {
      const response = await EventApiComponent(url, method, body);
      return {success: true, response};
    } catch (error) {
      console.error('Error in EventService.patchEVENTStatus:', error);
      return {
        success: false,
        error: error.message || 'An unexpected error occurred.',
      };
    }
  },

  deleteEvent: async eventId => {
    const url = `${Constants.FIREBASE_URL}/${Constants.EVENTS}/${eventId}?key=${Constants.FIREBASE_KEY}`;
    const method = 'DELETE';

    try {
      const response = await EventApiComponent(url, method);

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
    const body = {
      structuredQuery: {
        from: [
          {
            collectionId: Constants.EVENTS,
          },
        ],
        where: {
          fieldFilter: {
            field: {
              fieldPath: 'userId',
            },
            op: 'EQUAL',
            value: {
              stringValue: userId,
            },
          },
        },
      },
    };

    try {
      const response = await EventApiComponent(url, method, body);

      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default EventService;
