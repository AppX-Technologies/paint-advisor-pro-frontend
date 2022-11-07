import axios from 'axios';

const endpoint = process.env.REACT_APP_API_BASE_URL_USERS;

const FETCH_USERS_COMPANY = `${endpoint}/list`;
const DELETE_USER = `${endpoint}/`;
const UPDATE_USER = `${endpoint}/update-user-details`;

// const {token} = JSON.parse(localStorage.getItem("user"));

const fetchUserMadeByCompany = async (userData) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userData.token}`
    }
  };
  delete userData.token;
  const response = await axios.post(FETCH_USERS_COMPANY, {}, config);
  return response.data;
};

const createUsersByCompany = async (userData) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userData.token}`
    }
  };
  delete userData.token;
  const response = await axios.post(endpoint, userData, config);
  return response.data;
};

const deleteUserByCompany = async (userData) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userData.token}`
    }
  };
  delete userData.token;
  const response = await axios.delete(DELETE_USER, {
    ...config,
    data: userData
  });
  return response.data;
};

const updateUserFromCompany = async (userData) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userData.token}`
    }
  };
  delete userData.token;
  const response = await axios.post(UPDATE_USER, userData, config);
  return response.data;
};

const usersFromCompanyService = {
  fetchUserMadeByCompany,
  createUsersByCompany,
  deleteUserByCompany,
  updateUserFromCompany
};

export default usersFromCompanyService;
