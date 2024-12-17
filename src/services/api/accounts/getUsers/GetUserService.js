import axios from 'axios';
import Constants from '../../../../components/common/Constants';

const GetUserService = {
  getAllUsers: async () => {
    const url = `${Constants.FIREBASE_URL}/${Constants.USERS}?key=${Constants.FIREBASE_KEY}`;

    try {
      const response = await axios.get(url);

      const formattedUsers = response.data.documents.map(doc => {
        const {fields, name, createTime, updateTime} = doc;

        return {
          id: name.split('/').pop(),
          email: fields.email.stringValue,
          name: fields.name.stringValue,
          password: fields.password.stringValue,
          role: fields.role.stringValue,
          // createTime,
          // updateTime,
        };
      });

      return formattedUsers;
    } catch (error) {
      throw error;
    }
  },

  getSpecificUser: async userId => {
    const url = `${Constants.FIREBASE_URL}/${Constants.USERS}?key=${Constants.FIREBASE_KEY}`;
    const method = 'get';

    try {
      const response = await axios({
        url,
        method,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      response.data.documents.forEach(doc => {
        const documentName = doc.name;

        const userIdFromDocument = documentName.split('/').pop();

        if (userIdFromDocument === userId) {
        }
      });

      const matchedUser = response.data.documents
        .map(doc => {
          const documentId = doc.name.split('/').pop();
          return {
            id: documentId,
            email: doc.fields.email.stringValue,
            name: doc.fields.name.stringValue,
            password: doc.fields.password.stringValue,
            role: doc.fields.role.stringValue,
          };
        })
        .find(user => user.id === userId);

      if (matchedUser) {
        return {
          success: true,
          data: matchedUser,
        };
      } else {
        return {
          success: false,
          error: 'No user found with the provided userId',
        };
      }
    } catch (error) {
      return {
        success: false,
        error: error.message || 'An unexpected error occurred.',
      };
    }
  },
};

export default GetUserService;
