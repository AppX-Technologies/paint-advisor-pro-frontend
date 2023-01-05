import axios from 'axios';

const endpoint = 'http://localhost:5001/production-rates';
const CREATE_PRODUCTION_RATE = `${endpoint}/`;
const FETCH_PRODUCTION_RATE = `http://localhost:5001/production-rates/list`;
const CREATE_BASE_RATE = `http://localhost:5001/proficiencies/`;
const FETCH_BASE_RATE = `http://localhost:5001/proficiencies/list`;

const fetchSingleProductionRate = async (userData) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userData.token}`
    }
  };
  delete userData.token;
  const response = await axios.post(FETCH_PRODUCTION_RATE, userData, config);
  return response.data[0];
};

const fetchProductionRate = async (userData) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userData.token}`
    }
  };
  const response = await axios.post(
    FETCH_PRODUCTION_RATE,
    {
      filter: userData.id ? { _id: userData.id } : { global: true }
    },
    config
  );

  return response.data;
};

const createProductionRate = async (userData) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userData.token}`
    }
  };
  delete userData.token;
  const response = await axios.put(
    `${CREATE_PRODUCTION_RATE}/${userData.productionRateId}`,
    {
      productionRates: [...userData.updatedProductionRateList]
    },
    config
  );
  return response.data;
};

const fetchBaseRate = async (userData) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userData.token}`
    }
  };
  const response = await axios.post(
    FETCH_BASE_RATE,
    {
      filter: userData.id ? { _id: userData.id } : { global: true }
    },
    config
  );

  return response.data;
};

const createBaseRate = async (userData) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userData.token}`
    }
  };
  delete userData.token;
  const response = await axios.put(
    `${CREATE_BASE_RATE}/${userData.baseRateId}`,
    {
      proficiencies: [...userData.updatedBaseRate]
    },
    config
  );
  return response.data;
};

const ProductionRateService = {
  fetchProductionRate,
  createProductionRate,
  fetchSingleProductionRate,
  fetchBaseRate,
  createBaseRate
};
export default ProductionRateService;
