import axios from 'axios';
import Constants from '../../../components/common/Constants';

const DashboardService = {
  fetchDashboardCount: async () => {
    const url = `${Constants.FIREBASE_URL}/dashboard?key=${Constants.FIREBASE_KEY}`;
    try {
      const response = await axios.get(url);
      const documents = response.data.documents;

      if (documents && documents.length > 0) {
        const aggregatedCount = {
          late: 0,
          leaves: 0,
          onTime: 0,
          tasks: 0,
          totalHours: 0,
        };

        documents.forEach(doc => {
          const fields = doc.fields;

          aggregatedCount.late += parseInt(fields.late?.integerValue, 10) || 0;
          aggregatedCount.leaves +=
            parseInt(fields.leaves?.integerValue, 10) || 0;
          aggregatedCount.onTime +=
            parseInt(fields.onTime?.integerValue, 10) || 0;
          aggregatedCount.tasks +=
            parseInt(fields.tasks?.integerValue, 10) || 0;
          aggregatedCount.totalHours +=
            parseInt(fields.totalHours?.integerValue, 10) || 0;
        });

        return aggregatedCount;
      } else {
        throw new Error('No documents found');
      }
    } catch (error) {
      throw error.response ? error.response.data : new Error('Network error');
    }
  },

  fetchUserDashboardCount: async userId => {
    const url = `${Constants.FIREBASE_POST_URL}key=${Constants.FIREBASE_KEY}`;
    const body = {
      structuredQuery: {
        from: [
          {
            collectionId: Constants.DASHBOARD,
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
      const documents = response.data;

      if (documents && documents.length > 0) {
        const aggregatedCount = {
          late: 0,
          leaves: 0,
          onTime: 0,
          tasks: 0,
          totalHours: 0,
          totalEmployees: 0,
        };

        documents.forEach(item => {
          const doc = item.document;
          if (doc && doc.fields) {
            const fields = doc.fields;

            aggregatedCount.late +=
              parseInt(fields.late?.integerValue, 10) || 0;
            aggregatedCount.leaves +=
              parseInt(fields.leaves?.integerValue, 10) || 0;
            aggregatedCount.onTime +=
              parseInt(fields.onTime?.integerValue, 10) || 0;
            aggregatedCount.tasks +=
              parseInt(fields.tasks?.integerValue, 10) || 0;
            aggregatedCount.totalHours +=
              parseInt(fields.totalHours?.integerValue, 10) || 0;
            aggregatedCount.totalEmployees +=
              parseInt(fields.totalEmployees?.integerValue, 10) || 0;
          }
        });

        return aggregatedCount;
      } else {
        throw new Error('No documents found');
      }
    } catch (error) {
      throw error.response ? error.response.data : new Error('Network error');
    }
  },
};

export default DashboardService;
