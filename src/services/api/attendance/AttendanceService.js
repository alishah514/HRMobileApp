import axios from 'axios';
import Constants from '../../../components/common/Constants';
import ExtractValues from '../../../components/utils/ExtractValues';

const AttendanceService = {
  fetchUserAttendance: async userId => {
    const url = `${Constants.FIREBASE_POST_URL}key=${Constants.FIREBASE_KEY}`;
    const body = {
      structuredQuery: {
        from: [
          {
            collectionId: Constants.ATTENDANCE,
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
      const response = await axios.post(url, body);
      const finalResponse = response.data
        .map(item => {
          const document = item.document || {};
          const fields = document.fields || {};
          const documentName = document.name || null;
          const createTime = document.createTime || null;
          const updateTime = document.updateTime || null;

          const values = ExtractValues(fields);

          return {
            name: documentName,
            createTime,
            updateTime,
            ...values,
          };
        })
        .filter(user => user !== null);

      return finalResponse;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
  },

  postAttendance: async data => {
    const url = `${Constants.FIREBASE_URL}/${Constants.ATTENDANCE}?key=${Constants.FIREBASE_KEY}`;
    const method = 'post';
    const body = {
      fields: {
        creationDate: {
          timestampValue: data.creationDate,
        },
        latitude: {
          integerValue: data.latitude,
        },
        longitude: {
          integerValue: data.longitude,
        },
        type: {
          stringValue: data.type,
        },
        userId: {
          stringValue: data.userId,
        },
        imageUrl: {
          referenceValue: data.image,
        },
      },
    };

    try {
      const response = await axios.post(url, body);
      console.log('Response: ' + response);
      return {success: true, response};
    } catch (error) {
      console.error('Error in AttendanceService.postAttendanceRequest:', error);
      return {
        success: false,
        error: error.message || 'An unexpected error occurred.',
      };
    }
  },
};

export default AttendanceService;
