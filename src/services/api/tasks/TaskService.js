import Constants from '../../../components/common/Constants';
import GenericApiComponent from '../GenericApiComponent';

const TaskService = {
  fetchTasks: async () => {
    const url = `${Constants.FIREBASE_URL}/${Constants.TASKS}?key=${Constants.FIREBASE_KEY}`;
    const method = 'get';
    const options = {resourceType: 'Task'};

    try {
      const response = await GenericApiComponent(url, method, null, options);
      return response;
    } catch (error) {
      throw error;
    }
  },

  postTask: async taskData => {
    const url = `${Constants.FIREBASE_URL}/${Constants.TASKS}?key=${Constants.FIREBASE_KEY}`;
    const method = 'post';
    const options = {resourceType: 'Task', postFlag: true};

    const body = {
      fields: {
        title: {stringValue: taskData.title},
        description: {stringValue: taskData.description},
        dueDate: {timestampValue: taskData.dueDate},
        status: {stringValue: taskData.status},
        category: {stringValue: taskData.category},
        department: {stringValue: taskData.department},
        priority: {stringValue: taskData.priority},
        assignedTo: {stringValue: taskData.assignedTo},
        storypoints: {integerValue: taskData.storypoints},
        taskCode: {stringValue: taskData.taskCode},
        assignedDate: {timestampValue: taskData.assignedDate},
        userId: {stringValue: taskData.userId},
      },
    };

    try {
      const response = await GenericApiComponent(url, method, body, options);
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
    const url = `${Constants.FIREBASE_URL}/${Constants.TASKS}/${taskId}?key=${Constants.FIREBASE_KEY}`;
    const method = 'patch';
    const options = {resourceType: 'Task'};

    const body = {
      fields: {
        title: {stringValue: taskData.title},
        description: {stringValue: taskData.description},
        dueDate: {timestampValue: taskData.dueDate},
        status: {stringValue: taskData.status},
        category: {stringValue: taskData.category},
        department: {stringValue: taskData.department},
        priority: {stringValue: taskData.priority},
        assignedTo: {stringValue: taskData.assignedTo},
        storypoints: {integerValue: taskData.storypoints},
        taskCode: {stringValue: taskData.taskCode},
        assignedDate: {timestampValue: taskData.assignedDate},
        userId: {stringValue: taskData.userId},
      },
    };

    try {
      const response = await GenericApiComponent(url, method, body, options);
      return {success: true, response};
    } catch (error) {
      console.error('Error in TaskService.patchTask:', error);
      return {
        success: false,
        error: error.message || 'An unexpected error occurred.',
      };
    }
  },

  deleteTask: async taskId => {
    const url = `${Constants.FIREBASE_URL}/${Constants.TASKS}/${taskId}?key=${Constants.FIREBASE_KEY}`;
    const method = 'delete';
    const options = {resourceType: 'Task'};

    try {
      const response = await GenericApiComponent(url, method, null, options);
      if (response) {
        return {success: true, message: 'Task deleted successfully'};
      } else {
        return {success: false, error: 'Failed to delete task'};
      }
    } catch (error) {
      console.error('Error in TaskService.deleteTask:', error);
      return {
        success: false,
        error: error.message || 'An unexpected error occurred.',
      };
    }
  },

  fetchUserTasks: async (
    userId,
    {sortBy = 'dueDate', direction = 'ASCENDING', limit = null} = {},
  ) => {
    const url = `${Constants.FIREBASE_POST_URL}key=${Constants.FIREBASE_KEY}`;
    const method = 'post';
    const options = {resourceType: 'Task'};

    const body = {
      structuredQuery: {
        from: [{collectionId: Constants.TASKS}],
        where: {
          fieldFilter: {
            field: {fieldPath: 'userId'},
            op: 'EQUAL',
            value: {stringValue: userId},
          },
        },
        orderBy: [
          {
            field: {fieldPath: sortBy},
            direction: direction.toUpperCase(),
          },
        ],
        ...(limit ? {limit} : {}),
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

export default TaskService;
