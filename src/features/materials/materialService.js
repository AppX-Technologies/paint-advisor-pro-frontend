import axios from 'axios';

const endpoint = 'http://localhost:5001/materials';
const CREATE_MATERIAL = `${endpoint}/`;
const FETCH_MATERIAL = `http://localhost:5001/materials/list`;
const UPDATE_MATERIAL = `${endpoint}/`;
const DELETE_MATERIAL = `${endpoint}/`;

const fetchMaterial = async (userData) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userData.token}`
    }
  };
  const response = await axios.post(
    FETCH_MATERIAL,
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

const fetchSingleMaterial = async (userData) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userData.token}`
    }
  };
  delete userData.token;
  const response = await axios.post(FETCH_MATERIAL, userData, config);
  return response.data[0];
};

const createMaterial = async (userData) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userData.token}`
    }
  };
  delete userData.token;
  const response = await axios.put(
    `${CREATE_MATERIAL}/${userData.ID}`,
    {
      materials: userData.add
        ? [
            ...(userData.previousMaterials ? userData.previousMaterials : []),
            {
              description: userData.description,
              unit: userData.unit,
              unitPrice: userData.unitPrice,
              bidType: userData.bidType,
              appliesTo: userData.appliesTo
            }
          ]
        : userData.previousMaterials.filter(
            (previousMaterial) => previousMaterial._id !== userData.idToBeDeleted
          )
    },
    config
  );
  return response.data;
};

const updateMaterial = async (userData) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userData.token}`
    }
  };
  delete userData.token;
  const response = await axios.put(`${UPDATE_MATERIAL}${userData.id}`, userData, config);
  return response.data;
};

const deleteMaterial = async (userData) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userData.token}`
    }
  };
  delete userData.token;
  const response = await axios.delete(`${DELETE_MATERIAL}${userData.id}`, config);
  return response.data;
};

const materialService = {
  fetchMaterial,
  createMaterial,
  updateMaterial,
  deleteMaterial,
  fetchSingleMaterial
};
export default materialService;
