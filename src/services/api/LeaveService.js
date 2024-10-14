import Constants from '../../components/common/Constants';
import FirestoreApiComponent from './FirestoreApiComponent';

const LeaveService = {
  fetchLeaves: async () => {
    const url = `${Constants.FIREBASE_URL}/leaves?key=${Constants.FIREBASE_KEY}`;
    const method = 'get';

    try {
      const response = await FirestoreApiComponent(url, method);
      console.log('Fetch Leaves', response);
      return response;
    } catch (error) {
      throw error;
    }
  },

  postLeave: async leaveData => {
    const url = `${Constants.FIREBASE_URL}/leaves?key=${Constants.FIREBASE_KEY}`;
    const method = 'post';
    const body = {
      fields: {
        reason: {
          stringValue: leaveData.reason,
        },
        fromDate: {
          timestampValue: leaveData.fromDate,
        },
        type: {
          stringValue: leaveData.type,
        },
        toDate: {
          timestampValue: leaveData.toDate,
        },
        period: {
          integerValue: leaveData.period.toString(),
        },
        status: {
          stringValue: leaveData.status,
        },
      },
    };

    try {
      const response = await FirestoreApiComponent(url, method, body, true);

      console.log('Post Leave:', response);
      return response;
    } catch (error) {
      throw error;
    }
  },

  fetchPaginatedLeaves: async ({
    sortBy = 'period',
    direction = 'ASCENDING',
    limit = 10,
  }) => {
    const url = `${Constants.FIREBASE_POST_URL}key=${Constants.FIREBASE_KEY}`;
    const method = 'post';
    const body = {
      structuredQuery: {
        from: [
          {
            collectionId: 'leaves',
          },
        ],
        orderBy: [
          {
            field: {
              fieldPath: sortBy,
            },
            direction: direction.toUpperCase(),
          },
        ],
        limit: limit,
      },
    };

    try {
      const response = await FirestoreApiComponent(url, method, body);
      console.log('Fetch Paginated Leaves', response);
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default LeaveService;
