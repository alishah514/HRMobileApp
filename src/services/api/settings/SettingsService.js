import Constants from '../../../components/common/Constants';
import SettingsApiComponent from './SettingsApiComponent';

const SettingsService = {
  fetchSettings: async () => {
    const url = `${Constants.FIREBASE_URL}/${Constants.SETTINGS}?key=${Constants.FIREBASE_KEY}`;
    const method = 'get';

    try {
      const response = await SettingsApiComponent(url, method);

      return response;
    } catch (error) {
      throw error;
    }
  },

  postSettings: async settingsData => {
    const url = `${Constants.FIREBASE_URL}/${Constants.SETTINGS}?key=${Constants.FIREBASE_KEY}`;
    const method = 'post';
    const body = {
      fields: {
        adminId: {
          stringValue: settingsData.adminId,
        },
        calendarId: {
          stringValue: settingsData.calendarId,
        },
        timezone: {
          stringValue: settingsData.timezone,
        },
      },
    };

    try {
      const response = await SettingsApiComponent(url, method, body, true);
      return {success: true, response};
    } catch (error) {
      console.error('Error in SettingsService.postSettingsRequest:', error);
      return {
        success: false,
        error: error.message || 'An unexpected error occurred.',
      };
    }
  },

  fetchAdminSettings: async adminId => {
    const url = `${Constants.FIREBASE_POST_URL}key=${Constants.FIREBASE_KEY}`;
    const method = 'post';
    const body = {
      structuredQuery: {
        from: [
          {
            collectionId: Constants.SETTINGS,
          },
        ],
        where: {
          fieldFilter: {
            field: {
              fieldPath: 'adminId',
            },
            op: 'EQUAL',
            value: {
              stringValue: adminId,
            },
          },
        },
      },
    };

    try {
      const response = await SettingsApiComponent(url, method, body);

      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default SettingsService;
