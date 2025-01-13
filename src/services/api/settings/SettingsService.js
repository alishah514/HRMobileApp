import Constants from '../../../components/common/Constants';
import GenericApiComponent from '../GenericApiComponent';

const SettingsService = {
  fetchSettings: async () => {
    const url = `${Constants.FIREBASE_URL}/${Constants.SETTINGS}?key=${Constants.FIREBASE_KEY}`;
    const method = 'get';
    const options = {resourceType: 'Settings'};

    try {
      const response = await GenericApiComponent(url, method, null, options);
      return response;
    } catch (error) {
      throw error;
    }
  },

  postSettings: async settingsData => {
    const url = `${Constants.FIREBASE_URL}/${Constants.SETTINGS}?key=${Constants.FIREBASE_KEY}`;
    const method = 'post';
    const options = {resourceType: 'Settings', postFlag: true};

    const body = {
      fields: {
        adminId: {stringValue: settingsData.adminId},
        calendarId: {stringValue: settingsData.calendarId},
        timezone: {stringValue: settingsData.timezone},
      },
    };

    try {
      const response = await GenericApiComponent(url, method, body, options);
      return {success: true, response};
    } catch (error) {
      console.error('Error in SettingsService.postSettings:', error);
      return {
        success: false,
        error: error.message || 'An unexpected error occurred.',
      };
    }
  },

  fetchAdminSettings: async adminId => {
    const url = `${Constants.FIREBASE_POST_URL}key=${Constants.FIREBASE_KEY}`;
    const method = 'post';
    const options = {resourceType: 'Settings'};

    const body = {
      structuredQuery: {
        from: [{collectionId: Constants.SETTINGS}],
        where: {
          fieldFilter: {
            field: {fieldPath: 'adminId'},
            op: 'EQUAL',
            value: {stringValue: adminId},
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

export default SettingsService;
