import axios from "axios";

const endpoint = process.env.REACT_APP_API_BASE_URL_ORGS;

const CREATE_ORGS = `${endpoint}/`;
const FETCH_ORGS = `${endpoint}/search`;
const UPDATE_ORG = `${endpoint}/`;
const DELETE_ORG = `${endpoint}/`;

const fetchOrgs = async (userData) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userData}`
    },
  };
  const response = await axios.post(FETCH_ORGS, {},config);
  return response.data;
};

const createOrgs = async (userData) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userData.token}`
    },
  };
  delete userData.token;
  const response = await axios.post(CREATE_ORGS, userData,config);
  return response.data;
};

const updateOrg = async (userData) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userData.token}`
    },
  };
  delete userData.token;
  const response = await axios.put(`${UPDATE_ORG}${userData.id}`, userData,config);
  return response.data;
};

const deleteOrg = async (userData) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userData.token}`
    },
  };
  console.log(userData);
  delete userData.token;
  const response = await axios.delete(`${DELETE_ORG}${userData.id}`,config);
  return response.data;
};

const orgService = { fetchOrgs, createOrgs, updateOrg, deleteOrg };
export default orgService;