import axios from 'axios';

const endpoint = process.env.REACT_APP_API_BASE_URL;

const CREATE_USERS = `${endpoint}/users`;
const FETCH_USERS = `${endpoint}/users/list`;
const UPDATE_USER = `${endpoint}/users/update-user-details`;
const DELETE_USER = `${endpoint}/users`;

const fetchUsers = async (userData) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userData}`
    }
  };
  const response = await axios.post(
    FETCH_USERS,
    {
      filter: { role: ['Admin'] }
    },
    config
  );
  return response.data;
};

const createUsers = async (userData) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userData.token}`
    }
  };
  delete userData.token;
  const response = await axios.post(CREATE_USERS, userData, config);
  return response.data;
};

const updateUser = async (userData) => {
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

const deleteUser = async (userData) => {
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

const userService = { fetchUsers, createUsers, updateUser, deleteUser };
export default userService;
