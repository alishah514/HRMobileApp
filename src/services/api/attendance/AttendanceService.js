import axios from 'axios';
import Constants from '../../../components/common/Constants';
import ExtractValues from '../../../components/utils/ExtractValues';
import moment from 'moment';
import {ExtractAttendanceData} from './AttendanceExtractComponent';

const AttendanceService = {
  fetchAllAttendance: async () => {
    const url = `${Constants.FIREBASE_URL}/${Constants.ATTENDANCE}?key=${Constants.FIREBASE_KEY}`;

    try {
      const response = await axios.get(url);

      const attendanceData = ExtractAttendanceData(response);

      return attendanceData;
    } catch (error) {
      console.error('Error fetching attendance:', error);
      throw error;
    }
  },

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
      console.error('Error fetching user attendance:', error);
      throw error;
    }
  },

  fetchUserWeeklyAttendance: async (userId, firstDate, lastDate) => {
    const url = `${Constants.FIREBASE_POST_URL}key=${Constants.FIREBASE_KEY}`;

    const startMoment = moment(firstDate);
    const endMoment = moment(lastDate);

    const startTimestamp = startMoment.valueOf();
    const endTimestamp = endMoment.valueOf();

    const body = {
      structuredQuery: {
        from: [
          {
            collectionId: Constants.ATTENDANCE,
          },
        ],
        where: {
          compositeFilter: {
            op: 'AND',
            filters: [
              {
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
              {
                fieldFilter: {
                  field: {
                    fieldPath: 'creationDate',
                  },
                  op: 'GREATER_THAN_OR_EQUAL',
                  value: {
                    timestampValue: {
                      seconds: Math.floor(startTimestamp / 1000),
                      nanos: (startTimestamp % 1000) * 1000000,
                    },
                  },
                },
              },
              {
                fieldFilter: {
                  field: {
                    fieldPath: 'creationDate',
                  },
                  op: 'LESS_THAN_OR_EQUAL',
                  value: {
                    timestampValue: {
                      seconds: Math.floor(endTimestamp / 1000),
                      nanos: (endTimestamp % 1000) * 1000000,
                    },
                  },
                },
              },
            ],
          },
        },
        orderBy: [
          {
            field: {
              fieldPath: 'creationDate',
            },
            direction: 'ASCENDING',
          },
        ],
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
      console.error('Error fetching user attendance:', error);
      throw error;
    }
  },

  postAttendance: async data => {
    const url = `${Constants.FIREBASE_URL}/${Constants.ATTENDANCE}?key=${Constants.FIREBASE_KEY}`;
    const body = {
      fields: {
        creationDate: {
          timestampValue: moment().toISOString(),
        },
        latitude: {
          doubleValue: data.latitude,
        },
        longitude: {
          doubleValue: data.longitude,
        },
        type: {
          stringValue: data.type,
        },
        userId: {
          stringValue: data.userId,
        },
        imageUrl: {
          stringValue: data.imageUrl,
        },
      },
    };

    try {
      const response = await axios.post(url, body);

      return {success: true, response: response.data};
    } catch (error) {
      console.error(
        'Error in AttendanceService.postAttendanceRequest:',
        error.response?.data || error,
      );
      return {
        success: false,
        error: error.message || 'An unexpected error occurred.',
      };
    }
  },

  fetchCurrentUserAttendance: async (userId, currentDate) => {
    const url = `${Constants.FIREBASE_POST_URL}key=${Constants.FIREBASE_KEY}`;
    const body = {
      structuredQuery: {
        from: [
          {
            collectionId: Constants.ATTENDANCE,
          },
        ],
        where: {
          compositeFilter: {
            op: 'AND',
            filters: [
              {
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
              {
                fieldFilter: {
                  field: {
                    fieldPath: 'creationDate',
                  },
                  op: 'GREATER_THAN_OR_EQUAL',
                  value: {
                    timestampValue: currentDate,
                  },
                },
              },
            ],
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

  fetchAdminCurrentAttendance: async currentDate => {
    const url = `${Constants.FIREBASE_POST_URL}key=${Constants.FIREBASE_KEY}`;
    const body = {
      structuredQuery: {
        from: [
          {
            collectionId: Constants.ATTENDANCE,
          },
        ],
        where: {
          compositeFilter: {
            op: 'AND',
            filters: [
              {
                fieldFilter: {
                  field: {
                    fieldPath: 'creationDate',
                  },
                  op: 'GREATER_THAN_OR_EQUAL',
                  value: {
                    timestampValue: currentDate,
                  },
                },
              },
            ],
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
};

export default AttendanceService;
