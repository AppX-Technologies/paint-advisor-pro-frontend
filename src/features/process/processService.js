import axios from "axios";

const endpoint = process.env.REACT_APP_API_BASE_URL_ORGS;
const CREATE_PROCESS = `${endpoint}/`;
const FETCH_PROCESS = `${endpoint}/search`;
const UPDATE_PROCESS = `${endpoint}/`;
const DELETE_PROCESS = `${endpoint}/`;

const fetchProcess = async (userData) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userData}`,
    },
  };
  console.log(endpoint);
  const response = await axios.post(FETCH_PROCESS, {}, config);
  return response.data;
};

const fetchSingleProcess = async (userData) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userData.token}`,
    },
  };
  delete userData.token;
  const response = await axios.post(FETCH_PROCESS, userData, config);
  return response.data[0];
};

const createProcess = async (userData) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userData.token}`,
    },
  };
  delete userData.token;
  const response = await axios.post(CREATE_PROCESS, userData, config);
  return response.data;
};

const updateProcess = async (userData) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userData.token}`,
    },
  };
  delete userData.token;
  const response = await axios.put(
    `${UPDATE_PROCESS}${userData.id}`,
    userData,
    config
  );
  return response.data;
};

const deleteProcess = async (userData) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userData.token}`,
    },
  };
  delete userData.token;
  const response = await axios.delete(
    `${DELETE_PROCESS}${userData.id}`,
    config
  );
  return response.data;
};

const processService = {
  fetchProcess,
  createProcess,
  updateProcess,
  deleteProcess,
  fetchSingleProcess,
};
export default processService;
