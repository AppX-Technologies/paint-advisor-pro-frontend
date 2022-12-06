export const removeItemFromArray = (array, id, pk = '_id') =>
  array.filter((item) => item[pk] !== id);

export const addOrUpdateItemInArray = (array, object, pk = '_id') => {
  const indexInArray = array.findIndex((item) => item[pk] === object[pk]);
  if (indexInArray === -1) {
    array.unshift(object);
    return array;
  }
  array[indexInArray] = object;
  return array;
};

export const updateClientBidInfo = (clientList, clientId, object) => {
  const foundClient = clientList.find((client) => client._id === clientId);
  if (foundClient) {
    foundClient.bid = object;
  }
  console.log(clientList, 'clientList');
  return clientList;
};
