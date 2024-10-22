import Constants from '../../../components/common/Constants';
import TaskApiComponent from './TaskApiComponent';

const TaskService = {
  fetchTasks: async () => {
    const url = `${Constants.FIREBASE_URL}/tasks?key=${Constants.FIREBASE_KEY}`;
    const method = 'get';

    try {
      const response = await TaskApiComponent(url, method);
      // console.log('Fetch Tasks', response);
      return response;
    } catch (error) {
      throw error;
    }
  },

  postTask: async taskData => {
    const url = `${Constants.FIREBASE_URL}/tasks?key=${Constants.FIREBASE_KEY}`;
    const method = 'post';
    const body = {
      fields: {
        title: {
          stringValue: taskData.title,
        },
        description: {
          stringValue: taskData.description,
        },
        dueDate: {
          timestampValue: taskData.dueDate,
        },
        status: {
          stringValue: taskData.status,
        },
        category: {
          stringValue: taskData.category,
        },
        completedTasks: {
          integerValue: taskData.completedTasks,
        },
        pendingTasks: {
          integerValue: taskData.pendingTasks,
        },
        department: {
          stringValue: taskData.department,
        },
        priority: {
          stringValue: taskData.priority,
        },
        estimatedJobs: {
          integerValue: taskData.estimatedJobs,
        },
        assignedTo: {
          arrayValue: {
            values: taskData.assignedTo.map(assignee => ({
              stringValue: assignee,
            })),
          },
        },
        storypoints: {
          integerValue: taskData.storypoints,
        },
        taskCode: {
          stringValue: taskData.taskCode,
        },
        assignedDate: {
          timestampValue: taskData.assignedDate,
        },
      },
    };

    try {
      const response = await TaskApiComponent(url, method, body, true);
      return {success: true, response};
    } catch (error) {
      console.error('Error in TaskService.postTask:', error);
      return {
        success: false,
        error: error.message || 'An unexpected error occurred.',
      };
    }
  },

  patchTaskStatus: async (taskId, taskData) => {
    const url = `${Constants.FIREBASE_URL}/tasks/${taskId}?key=${Constants.FIREBASE_KEY}`;
    const method = 'patch';
    const body = {
      fields: {
        title: {
          stringValue: taskData.title,
        },
        description: {
          stringValue: taskData.description,
        },
        dueDate: {
          timestampValue: taskData.dueDate,
        },
        status: {
          stringValue: taskData.status,
        },
        category: {
          stringValue: taskData.category,
        },
        completedTasks: {
          integerValue: taskData.completedTasks,
        },
        pendingTasks: {
          integerValue: taskData.pendingTasks,
        },
        department: {
          stringValue: taskData.department,
        },
        priority: {
          stringValue: taskData.priority,
        },
        estimatedJobs: {
          integerValue: taskData.estimatedJobs,
        },
        assignedTo: {
          arrayValue: {
            values: taskData.assignedTo.map(assignee => ({
              stringValue: assignee,
            })),
          },
        },
        storypoints: {
          integerValue: taskData.storypoints,
        },
        taskCode: {
          stringValue: taskData.taskCode,
        },
        assignedDate: {
          timestampValue: taskData.assignedDate,
        },
      },
    };

    try {
      const response = await TaskApiComponent(url, method, body);
      return {success: true, response};
    } catch (error) {
      console.error('Error in TaskService.patchTaskStatus:', error);
      return {
        success: false,
        error: error.message || 'An unexpected error occurred.',
      };
    }
  },

  fetchPaginatedTasks: async ({
    sortBy = 'dueDate',
    direction = 'ASCENDING',
    limit = 10,
  }) => {
    const url = `${Constants.FIREBASE_POST_URL}key=${Constants.FIREBASE_KEY}`;
    const method = 'post';
    const body = {
      structuredQuery: {
        from: [
          {
            collectionId: 'tasks',
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
      const response = await TaskApiComponent(url, method, body);
      // console.log('Fetch Paginated Tasks', response);

      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default TaskService;
