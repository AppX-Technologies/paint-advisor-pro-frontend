export const findSameTypeOfWall = (walls) => {
  const wallsDimensionsAndCount = [];
  walls.forEach((wall) => {
    const wallsWithSameDim = wallsDimensionsAndCount.find(
      (wd) => wd.length === wall.length && wd.height === wall.height
    );
    if (!wallsWithSameDim) {
      wallsDimensionsAndCount.push({ length: wall.length, height: wall.height, count: 1 });
    } else {
      wallsWithSameDim.count += 1;
    }
  });
  let strings = '';
  wallsDimensionsAndCount.forEach((obj) => {
    strings = strings.concat(`${obj.count} wall of ${obj.length}x${obj.height}`, ',');
  });
  return strings;
};

export const findRoomRelatedInfo = (roomRelatedInfo, name) => {
  return roomRelatedInfo.find((roomInfo) => roomInfo.name === name);
};
