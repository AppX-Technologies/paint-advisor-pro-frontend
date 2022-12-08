import axios from 'axios';
import { STATUS_ESTIMATE_IN_PROGRESS } from '../../helpers/contants';

const clientEndpoint = 'http://localhost:5001/clients';
const bidEndPoint = 'http://localhost:5001/bids';

// Client Related Endpoints
const CREATE_CLIENTS = `${clientEndpoint}/`;
const FETCH_CLIENTS = `${clientEndpoint}/search`;
const UPDATE_CLIENT = `${clientEndpoint}`;

// Bids Related Endpoints
const CREATE_BID = `${bidEndPoint}`;
const UPDATE_BID = `${bidEndPoint}`;

export const fetchAllClientsService = async (userData) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userData.token}`
    }
  };

  const filterValueObj = {};

  userData.bidFilterValues?.forEach((filter) => {
    filterValueObj[filter.name] = [...filter.values];
  });

  const response = await axios.post(
    FETCH_CLIENTS,
    {
      limit: Number(userData.limit),
      query: userData.query,
      sort: { [userData.sort]: Number(userData.isAscending) },
      filter: { bidTypes: filterValueObj.bidTypes }
    },
    config
  );
  return response;
};

export const createClientService = async (userData) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userData.token}`
    }
  };
  const response = await axios.post(
    CREATE_CLIENTS,
    {
      ...userData,
      organization: userData.organization,
      token: userData.token
    },
    config
  );
  return response;
};

export const updateClientService = async (userData) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userData.token}`
    }
  };
  const response = await axios.put(
    `${UPDATE_CLIENT}/${userData.id}`,
    {
      ...userData
    },
    config
  );
  return response;
};

export const createACommentService = async (userData) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userData.token}`
    }
  };
  const response = await axios.put(
    `${UPDATE_CLIENT}/${userData.id}`,
    {
      comments: userData.comment
    },
    config
  );
  return response;
};

export const uploadAFileService = async (userData) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userData.token}`
    }
  };

  const filteredFileInfo = userData.files.map((file) => {
    return file.id;
  });
  const updatedClientInfo = {
    files: [...userData.currentClientInfo.files, ...filteredFileInfo]
  };
  const response = await axios.put(
    `${UPDATE_CLIENT}/${userData.currentClientInfo._id}`,
    {
      ...updatedClientInfo,
      token: userData.token
    },
    config
  );
  return response;
};

export const deleteFileService = async (userData) => {
  const response = await axios({
    method: 'delete',
    url: `http://localhost:5001/api/files/${userData.id}`,
    data: {},
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${userData.token}`
    }
  });
  return response;
};

export const updateClientStatusService = async (userData) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userData.token}`
    }
  };

  const response = await axios.put(
    `${UPDATE_CLIENT}/${userData.id}`,
    {
      status: userData.status
    },
    config
  );
  return response;
};

// *Bids Related Services

export const createBidServices = async (userData) => {
  console.log(userData, 'userData');
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userData.token}`
    }
  };

  const response = await axios.post(
    `${CREATE_BID}`,
    {
      ...userData.bidFields,
      organization: userData.organization
    },
    config
  );
  return { response, clientId: userData.id };
};

export const updateBidService = async (userData) => {
  console.log(userData.rooms, 'userData.bidFields.bidFields');
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userData.token}`
    }
  };

  const response = await axios.put(
    `${UPDATE_BID}/${userData._id}`,
    {
      ...userData.bidFields
    },
    config
  );
  console.log(response, 'jfhdghjdfghj');

  return response;
};
