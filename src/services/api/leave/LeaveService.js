import Constants from '../../../components/common/Constants';
import GenericApiComponent from '../GenericApiComponent';

const LeaveService = {
  fetchLeaves: async () => {
    const url = `${Constants.FIREBASE_URL}/${Constants.LEAVES}?key=${Constants.FIREBASE_KEY}`;
    const method = 'get';

    try {
      const response = await GenericApiComponent(url, method, null, {
        resourceType: 'Leave',
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  postLeave: async leaveData => {
    const url = `${Constants.FIREBASE_URL}/${Constants.LEAVES}?key=${Constants.FIREBASE_KEY}`;
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
        leaveDocument: {
          stringValue: leaveData.leaveDocument,
        },
      },
    };

    try {
      const response = await GenericApiComponent(url, method, body, {
        postFlag: true,
      });
      return {success: true, response};
    } catch (error) {
      console.error('Error in LeaveService.postLeave:', error);
      return {
        success: false,
        error: error.message || 'An unexpected error occurred.',
      };
    }
  },

  patchLeaveStatus: async (leaveId, leaveData) => {
    const url = `${Constants.FIREBASE_URL}/${Constants.LEAVES}/${leaveId}?key=${Constants.FIREBASE_KEY}`;
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
        leaveDocument: {
          stringValue: leaveData.leaveDocument || '',
        },
      },
    };

    try {
      const response = await GenericApiComponent(url, method, body);
      return {success: true, response};
    } catch (error) {
      console.error('Error in LeaveService.patchLeaveStatus:', error);
      return {
        success: false,
        error: error.message || 'An unexpected error occurred.',
      };
    }
  },

  deleteLeave: async leaveId => {
    const url = `${Constants.FIREBASE_URL}/${Constants.LEAVES}/${leaveId}?key=${Constants.FIREBASE_KEY}`;
    const method = 'delete';

    try {
      const response = await GenericApiComponent(url, method);

      if (response) {
        return {success: true, message: 'Leave deleted successfully'};
      } else {
        return {success: false, error: 'Failed to delete leave'};
      }
    } catch (error) {
      console.error('Error in LeaveService.deleteLeave:', error);
      return {
        success: false,
        error: error.message || 'An unexpected error occurred.',
      };
    }
  },

  fetchUserLeaves: async (
    userId,
    {sortBy = 'period', direction = 'ASCENDING', limit = null},
  ) => {
    const url = `${Constants.FIREBASE_POST_URL}key=${Constants.FIREBASE_KEY}`;
    const method = 'post';
    const body = {
      structuredQuery: {
        from: [
          {
            collectionId: Constants.LEAVES,
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
        ...(limit ? {limit: limit} : {}),
      },
    };

    try {
      const response = await GenericApiComponent(url, method, body, {
        resourceType: 'Leave',
      });
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default LeaveService;
