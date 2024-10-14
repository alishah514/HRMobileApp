import axios from 'axios';

const API_URL_LOGIN =
  'https://66fa9a1eafc569e13a9c64ba.mockapi.io/Hrapp/api/v1/login';

const API_URL_LEAVES =
  'https://66fa9a1eafc569e13a9c64ba.mockapi.io/Hrapp/api/v1/users';

// Login function
export const loginUserDummy = async (email, password) => {
  try {
    const response = await axios.get(API_URL_LOGIN);
    const users = response.data;

    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      console.log('Login successful:', user);
      return user; // Return user data on successful login
    } else {
      console.log('Invalid email or password');
      return {error: 'Invalid email or password'}; // Handle incorrect credentials
    }
  } catch (error) {
    console.error('Error during login:', error);
    return {error: 'An error occurred during login'};
  }
};

// Function to fetch leave list
export const getLeaveList = async () => {
  try {
    const response = await axios.get(API_URL_LEAVES);
    const leaves = response.data;

    if (leaves.length > 0) {
      console.log('Leave list:', leaves);
      return leaves; // Return the leave data if found
    } else {
      console.log('No leaves found');
      return {error: 'No leaves found'}; // Handle if no leaves are found
    }
  } catch (error) {
    console.error('Error fetching leave list:', error);
    return {error: 'An error occurred while fetching the leave list'};
  }
};
