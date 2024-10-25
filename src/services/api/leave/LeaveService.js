import Constants from '../../../components/common/Constants';
import LeaveApiComponent from './LeaveApiComponent';

const LeaveService = {
  fetchLeaves: async () => {
    const url = `${Constants.FIREBASE_URL}/leaves?key=${Constants.FIREBASE_KEY}`;
    const method = 'get';

    try {
      const response = await LeaveApiComponent(url, method);
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
        userId: {
          stringValue: leaveData.userId,
        },
      },
    };

    try {
      const response = await LeaveApiComponent(url, method, body, true);
      return {success: true, response};
    } catch (error) {
      console.error('Error in LeaveService.postLeaveRequest:', error);
      return {
        success: false,
        error: error.message || 'An unexpected error occurred.',
      };
    }
  },

  patchLeaveStatus: async (leaveId, leaveData) => {
    const url = `${Constants.FIREBASE_URL}/leaves/${leaveId}?key=${Constants.FIREBASE_KEY}`;
    const method = 'patch';
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
        userId: {
          stringValue: leaveData.userId,
        },
      },
    };

    try {
      const response = await LeaveApiComponent(url, method, body);
      return {success: true, response};
    } catch (error) {
      console.error('Error in LeaveService.patchLeaveStatus:', error);
      return {
        success: false,
        error: error.message || 'An unexpected error occurred.',
      };
    }
  },

  fetchPaginatedLeaves: async (
    userId,
    {sortBy = 'period', direction = 'ASCENDING', limit = 10},
  ) => {
    const url = `${Constants.FIREBASE_POST_URL}key=${Constants.FIREBASE_KEY}`;
    const method = 'post';
    const body = {
      structuredQuery: {
        from: [
          {
            collectionId: 'leaves',
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
      const response = await LeaveApiComponent(url, method, body);
      // console.log('Fetch Paginated Leaves', response);
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default LeaveService;
