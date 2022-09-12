import axios from "axios";

// reminder to edit this after api is ready
const endpoint = process.env.API_BASE_URL;
const REGISTRATION_OTP = `${endpoint}/generateRegistrationOtp`;
const REGISTER_URL =`${endpoint}/register`;
const LOGIN_URL = "/api/v1/auth/jwt/create/";


const generateRegistrationOtp = async (userData) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await axios.post(REGISTRATION_OTP, userData, config);
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
