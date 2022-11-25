// Todo Complete API

import axios from 'axios';

const endpoint = 'https://painting-app-backend.herokuapp.com/clients';

const CREATE_CLIENTS = `${endpoint}/`;
const FETCH_CLIENTS = `${endpoint}/search`;
const UPDATE_CLIENT = `${endpoint}`;
const DELETE_CLIENT = `${endpoint}/`;
const DELETE_FILE = `https://painting-app-backend.herokuapp.com/api/files/`;

export const fetchAllClientsService = async (userData) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userData.token}`
    }
  };
  const response = await axios.post(FETCH_CLIENTS, {}, config);
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
      ...userData,
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
  userData.currentClientInfo.comments.push(userData.comment);
  const response = await axios.put(
    `${UPDATE_CLIENT}/${userData.id}`,
    {
      comments: [...userData.currentClientInfo.comments]
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
