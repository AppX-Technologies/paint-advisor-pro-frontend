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
    strings = strings.concat(`${obj.count} of ${obj.length}x${obj.height}`, ',');
  });
  return strings.slice(0, strings.length - 1);
};

export const findRoomRelatedInfo = (roomRelatedInfo, name) => {
  return roomRelatedInfo.find((roomInfo) => roomInfo.name === name);
};

export const findPaintableAndNonPaintableArea = (surface) => {
  const area = {
    paintable: 0,
    nonPaintable: 0
  };
  surface.forEach((wall) => {
    if (wall.paint) {
      area.paintable += wall.length * wall.height;
    } else {
      area.nonPaintable += wall.length * wall.height;
    }
  });
  return area;
};
