import axios from 'axios';
import { companyProductionRate } from '../../helpers/contants';

const endpoint = 'http://localhost:5001/production-rates';
const CREATE_PROCESS = `${endpoint}/`;
const FETCH_PROCESS = `http://localhost:5001/production-rates/list`;

const fetchProductionRate = async (userData) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userData.token}`
    }
  };
  const response = await axios.post(
    FETCH_PROCESS,
    {
      filter: userData.id ? { _id: userData.id } : { global: true }
    },
    config
  );

  return response.data;
};

const fetchSingleProductionRate = async (userData) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userData.token}`
    }
  };
  delete userData.token;
  const response = await axios.post(FETCH_PROCESS, userData, config);
  return response.data[0];
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
    `${CREATE_PROCESS}/${userData.ID}`,
    {
      productionRates: userData.add
        ? [...userData.list]
        : userData.previousProductionRates.filter(
            (previousProductionRate) => previousProductionRate._id !== userData.idToBeDeleted
          )
    },
    config
  );
  return response.data;
};

const ProductionRateService = {
  fetchProductionRate,
  createProductionRate,
  fetchSingleProductionRate
};
export default ProductionRateService;
