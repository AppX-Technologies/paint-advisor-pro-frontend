import axios from 'axios';

const endpoint = 'https://painting-app-backend.herokuapp.com/clients';

const CREATE_CLIENTS = `${endpoint}/`;
const FETCH_CLIENTS = `${endpoint}/search`;
const UPDATE_CLIENT = `${endpoint}`;

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
      filter: filterValueObj
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
    url: `https://painting-app-backend.herokuapp.com/api/files/${userData.id}`,
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
