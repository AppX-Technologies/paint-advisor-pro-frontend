import axios from 'axios';

const endpoint = process.env.REACT_APP_API_BASE_URL;

const FETCH_USERS_COMPANY = `${endpoint}/users/list`;
const DELETE_USER = `${endpoint}/users`;
const CREATE_USER = `${endpoint}/users`;
const UPDATE_USER = `${endpoint}/users/update-user-details`;

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
  const response = await axios.post(CREATE_USER, userData, config);
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
  console.log(userData, 'userData');
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userData.token}`
    }
  };
  delete userData.token;
  delete userData.organization;
  const response = await axios.post(
    UPDATE_USER,
    { ...userData, organization: userData.orgId },
    config
  );
  return response.data;
};

const usersFromCompanyService = {
  fetchUserMadeByCompany,
  createUsersByCompany,
  deleteUserByCompany,
  updateUserFromCompany
};

export default usersFromCompanyService;
