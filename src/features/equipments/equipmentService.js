import axios from 'axios';

const endpoint = process.env.REACT_APP_API_BASE_URL;

const CREATE_EQUIPMENT = `${endpoint}/equipments`;
const FETCH_EQUIPMENT = `${endpoint}/equipments/list`;
const UPDATE_EQUIPMENT = `${endpoint}/equipments`;
const DELETE_EQUIPMENT = `${endpoint}/equipments`;

const fetchEquipment = async (userData) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userData.token}`
    }
  };
  const response = await axios.post(
    FETCH_EQUIPMENT,
    {
      filter: userData.filterValues
        ? { organization: userData?.filterValues?.organization }
        : userData?.id
        ? { _id: userData.id }
        : { global: true }
    },
    config
  );

  return response.data;
};

const fetchSingleEquipment = async (userData) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userData.token}`
    }
  };
  delete userData.token;
  const response = await axios.post(FETCH_EQUIPMENT, userData, config);
  return response.data[0];
};

const createEquipment = async (userData) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userData.token}`
    }
  };
  delete userData.token;
  const response = await axios.put(
    `${CREATE_EQUIPMENT}/${userData.ID}`,
    {
      equipments: userData.add
        ? [
            ...(userData.previousEquipments ? userData.previousEquipments : []),
            {
              description: userData.description,
              unit: userData.unit,
              unitPrice: userData.unitPrice,
              bidType: userData.bidType,
              appliesTo: userData.appliesTo
            }
          ]
        : userData.previousEquipments.filter(
            (previousEquipment) => previousEquipment._id !== userData.idToBeDeleted
          )
    },
    config
  );
  return response.data;
};

const updateEquipment = async (userData) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userData.token}`
    }
  };
  delete userData.token;
  const response = await axios.put(`${UPDATE_EQUIPMENT}${userData.id}`, userData, config);
  return response.data;
};

const deleteEquipment = async (userData) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userData.token}`
    }
  };
  delete userData.token;
  const response = await axios.delete(`${DELETE_EQUIPMENT}${userData.id}`, config);
  return response.data;
};

const equipmentService = {
  fetchEquipment,
  createEquipment,
  updateEquipment,
  deleteEquipment,
  fetchSingleEquipment
};
export default equipmentService;
