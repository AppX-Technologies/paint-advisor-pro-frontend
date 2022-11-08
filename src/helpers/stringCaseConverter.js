export const convertStringCase = (stringInput) => {
  const trimmedStringInput = stringInput.trim();
  const includesHyphen = trimmedStringInput.includes('-') ? '-' : ' ';
  const stringSeperatedBySpaceToArray = trimmedStringInput.split(includesHyphen);

  stringSeperatedBySpaceToArray.forEach((stringValue, index) => {
    stringSeperatedBySpaceToArray.splice(
      index,
      1,
      stringValue[0].toUpperCase() + stringValue.slice(1)
    );
  });

  return stringSeperatedBySpaceToArray.join(includesHyphen);
};
