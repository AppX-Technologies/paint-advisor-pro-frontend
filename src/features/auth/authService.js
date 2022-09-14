import axios from "axios";

// reminder to edit this after api is ready
const endpoint = process.env.REACT_APP_API_BASE_URL;
const REGISTRATION_OTP = `${endpoint}/generate-registration-otp`;
const REGISTER_URL =`${endpoint}/register`;
const LOGIN_URL = `${endpoint}/login`;

const generateRegistrationOtp = async (userData) => {
  const response = await axios.post(REGISTRATION_OTP, userData);
  return response.data;
};

// Register user
const register = async (userData) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await axios.post(REGISTER_URL, userData, config);
  return response.data;
};

// Login user

const login = async (userData) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await axios.post(LOGIN_URL, userData, config);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const logout = () => localStorage.removeItem("user");

const authService = { register, login, logout ,generateRegistrationOtp};
export default authService;
