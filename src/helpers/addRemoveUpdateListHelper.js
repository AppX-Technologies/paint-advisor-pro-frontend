export const removeItemFromArray = (array, id, pk = '_id') =>
  array.filter((item) => item[pk] !== id);

export const addOrUpdateItemInArray = (array, object, pk = '_id') => {
  const indexInArray = array.findIndex((item) => item[pk] === object[pk]);
  if (indexInArray === -1) {
    array.push(object);
    return array;
  }
  array[indexInArray] = object;
  return array;
};
