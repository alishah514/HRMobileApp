import axios from 'axios';
import Constants from '../../../components/common/Constants';
import {ExtractValues} from './ProfileExtractComponent';

const ProfileService = {
  fetchAllProfile: async () => {
    const url = `${Constants.FIREBASE_URL}/${Constants.EMPLOYEES}?key=${Constants.FIREBASE_KEY}`;

    try {
      const response = await axios.get(url);
      const documents = response.data.documents || [];

      const ExtractValues = fields => {
        const parsedValues = {};

        Object.entries(fields).forEach(([key, value]) => {
          if (value.stringValue !== undefined) {
            parsedValues[key] = value.stringValue;
          } else if (value.integerValue !== undefined) {
            parsedValues[key] = parseInt(value.integerValue, 10);
          } else if (value.timestampValue !== undefined) {
            parsedValues[key] = new Date(value.timestampValue).toISOString();
          } else if (value.mapValue !== undefined) {
            parsedValues[key] = ExtractValues(value.mapValue.fields || {});
          } else if (value.arrayValue !== undefined) {
            parsedValues[key] =
              value.arrayValue.values?.map(arrayItem =>
                ExtractValues(arrayItem.mapValue.fields || {}),
              ) || [];
          }
        });

        return parsedValues;
      };

      const formattedData = documents.map(document => {
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
      });

      return formattedData;
    } catch (error) {
      console.error('Error fetching profiles:', error);
      throw error;
    }
  },

  fetchUserProfile: async userId => {
    const url = `${Constants.FIREBASE_POST_URL}key=${Constants.FIREBASE_KEY}`;
    const body = {
      structuredQuery: {
        from: [
          {
            collectionId: Constants.EMPLOYEES,
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

      return finalResponse[0];
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
  },

  patchEditProfile: async (profileId, profileData) => {
    const url = `${Constants.FIREBASE_URL}/${Constants.EMPLOYEES}/${profileId}?key=${Constants.FIREBASE_KEY}`;
    const method = 'patch';

    const body = {
      fields: {
        job: {
          mapValue: {
            fields: {
              Designation: {
                stringValue: profileData.job?.Designation || '',
              },
              Department: {
                stringValue: profileData.job?.Department || '',
              },
              JoiningDate: {
                timestampValue: profileData.job?.JoiningDate || '',
              },
              employmentType: {
                stringValue: profileData.job?.employmentType || '',
              },
              salary: {
                stringValue: profileData.job?.salary || '',
              },
              wageType: {
                stringValue: profileData.job?.wageType || '',
              },
            },
          },
        },
        personal: {
          mapValue: {
            fields: {
              employeeId: {
                stringValue: profileId,
              },
              fullName: {
                stringValue: profileData.personal?.fullName || '',
              },
              phone: {
                integerValue: profileData.personal?.phone || '0',
              },
              email: {
                stringValue: profileData.personal?.email || '',
              },
              birthDate: {
                timestampValue: profileData.personal?.birthDate || '',
              },
              gender: {
                stringValue: profileData.personal?.gender || '',
              },
            },
          },
        },
        userId: {
          stringValue: profileData.userId || '',
        },
        education: {
          arrayValue: {
            values:
              profileData.education?.map(edu => ({
                mapValue: {
                  fields: {
                    startDate: {
                      timestampValue: edu.startDate || '',
                    },
                    Institute: {
                      stringValue: edu.Institute || '',
                    },
                    Degree: {
                      stringValue: edu.Degree || '',
                    },

                    endDate: {
                      timestampValue: edu.endDate || '',
                    },
                  },
                },
              })) || [],
          },
        },
      },
    };

    try {
      const response = await axios.patch(url, body);
      return {success: true, response: response.data};
    } catch (error) {
      console.error('Error in LeaveService.patchLeaveStatus:', error);
      return {
        success: false,
        error: error.message || 'An unexpected error occurred.',
      };
    }
  },
};

export default ProfileService;
