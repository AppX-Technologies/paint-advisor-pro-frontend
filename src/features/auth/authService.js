import axios from 'axios';

// reminder to edit this after api is ready
const endpoint = process.env.REACT_APP_API_BASE_URL;
const REGISTRATION_OTP = `${endpoint}/users/generate-registration-otp`;
const FORGOT_PASSWORD_OTP = `${endpoint}/users/send-password-reset-link`;
const RESET_PASSWORD = `${endpoint}/users/reset-password`;
const REGISTER_URL = `${endpoint}/users/register`;
const UPDATE_USER = `${endpoint}/users/update-user-details`;
const UPDATE_PASSWORD = `${endpoint}/users/change-password`;
const LOGIN_URL = `${endpoint}/users/login`;

const generateRegistrationOtp = async (userData) => {
  const response = await axios.post(REGISTRATION_OTP, userData);
  return response.data;
};
export const getUserDetail = () => {
  return (
    JSON.parse(localStorage.getItem('user')) || {
      token: null
    }
  );
};

// Register user
const register = async (userData) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const response = await axios.post(REGISTER_URL, userData, config);
  return response.data;
};

// Login user

const login = async (userData) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const response = await axios.post(LOGIN_URL, userData, config);
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

const logout = () => localStorage.removeItem('user');

const sendForgotPasswordLink = async (userData) => {
  const response = await axios.post(FORGOT_PASSWORD_OTP, userData);
  return response.data;
};
const resetPassword = async (userData) => {
  const response = await axios.post(RESET_PASSWORD, userData);
  return response.data;
};

const getLoggedInUser = () => {
  const user = localStorage.getItem('user');
  if (!user) return;

  try {
    return JSON.parse(user);
  } catch (e) {
    // no user
  }
};
const updateUserDetails = async (userData) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userData.token}`
    }
  };
  delete userData.token;
  const response = await axios.post(
    UPDATE_USER,
    {
      ...userData
    },
    config
  );
  return response.data;
};

const changePassword = async (userData) => {
  console.log(userData);
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userData.token}`
    }
  };
  delete userData.token;
  const response = await axios.post(
    UPDATE_PASSWORD,
    {
      ...userData
    },
    config
  );
  return response.data;
};

const authService = {
  register,
  login,
  logout,
  generateRegistrationOtp,
  sendForgotPasswordLink,
  resetPassword,
  getLoggedInUser,
  updateUserDetails,
  changePassword
};
export default authService;
