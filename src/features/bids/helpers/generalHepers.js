import axios from 'axios';
import { buttonStageInfo } from '../../../common/ButtonStageInfo';

export const findCurrentStageButtonInfo = (stageName) => {
  return buttonStageInfo.find((info) => info.name === stageName);
};

export const findCurrentClient = (clientList, selectedListItem) => {
  return clientList.find((client) => client._id === selectedListItem);
};

export const searchedResult = (list, keyword) => {
  return list.filter((item) => item?.name?.toLowerCase().trim().includes(keyword.toLowerCase()));
};

export const findCommentsUniquely = (originalCommentList, searchValue) => {
  return originalCommentList.filter((comment) => comment.name === searchValue);
};

export const filterClientsBySelectedStep = (clients, selectedStep) => {
  return clients.filter((client) => client.status === selectedStep);
};

export const readFile = async ({ fileName, mimeType, token }) => {
  try {
    const response = await axios.get(`http://localhost:5001/api/files/stream/${fileName}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      responseType: 'blob'
    });
    if (response.status < 200 || response.status >= 300) {
      if (response.status === 401) {
        setTimeout(() => {
          localStorage.clear();
          window.location.reload();
        }, 1500);
        return { error: 'Your session has expired, please try logging in again!' };
      }
    } else {
      const blobFromResponse = await new Blob([response.data], { type: mimeType });
      const returnValue = URL.createObjectURL(blobFromResponse);
      return { response: returnValue };
    }
  } catch (e) {
    return { error: 'Oops something went wrong!' };
  }
};

export const downloadFileFromBase64 = ({ data, fileName, mimeType }) => {
  const downloadLink = document.createElement('a');
  downloadLink.href = mimeType ? `data:${mimeType};base64,${data}` : data;
  downloadLink.target = '_self';
  downloadLink.download = fileName;

  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
};
export const humanFileSize = (bytes, si = false, dp = 1) => {
  const thresh = si ? 1000 : 1024;

  if (Math.abs(bytes) < thresh) {
    return `${bytes} B`;
  }

  const units = si
    ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
  let u = -1;
  const r = 10 ** dp;

  do {
    bytes /= thresh;
    ++u;
  } while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1);

  return `${bytes.toFixed(dp)} ${units[u]}`;
};

export const findPaintableMaterials = (rooms) => {
  const paintableAreaOfARoom =
    rooms &&
    rooms.map((room) => {
      return Object.keys(room)
        .filter((item) => Array.isArray(room[item]))
        .reduce((total, roomEle) => {
          return {
            ...total,
            [roomEle]: roomEle !== 'walls' ? room[roomEle].filter((a) => a.paint) : room[roomEle],
            roomName: room.roomName
          };
        }, {});
    });

  return paintableAreaOfARoom;
};

export const groupedPaintableMaterials = (rooms) => {
  const paintableAreaAccrToSection = [];

  const allPaintAbleArea = findPaintableMaterials(rooms);
  if (allPaintAbleArea) {
    allPaintAbleArea.forEach((paintableArea) => {
      Object.keys(paintableArea)
        .filter((a) => a !== 'roomName')
        .forEach((paintableEle) => {
          const foundItem = paintableAreaAccrToSection.find((item) => item.name === paintableEle);
          if (foundItem) {
            foundItem.mainItems.push({
              name: paintableArea.roomName,
              values: [...paintableArea[paintableEle]]
            });
          } else {
            paintableAreaAccrToSection.push({
              name: paintableEle,
              mainItems: [
                { name: paintableArea.roomName, values: [...paintableArea[paintableEle]] }
              ]
            });
          }
        });
    });
    return paintableAreaAccrToSection;
  }
};

export const onlyWindows = (rooms) => {
  const allPaintAbleArea = findPaintableMaterials(rooms);
  const paintableWindows = allPaintAbleArea.map((area) => {
    return { roomName: area.roomName, windows: area.windows };
  });
  return paintableWindows;
};

export const setMaterialsAccordingToSection = (materialList) => {
  const materialsAccordingToSection = [];
  if (materialList && materialList[0]) {
    materialList[0]?.materials.forEach((material) => {
      material?.appliesTo?.forEach((materialApplication) => {
        const foundMaterialSection = materialsAccordingToSection.find(
          (materialSection) => materialSection.name === materialApplication
        );
        if (foundMaterialSection) {
          foundMaterialSection.values.push({
            description: material.description,
            unit: material.unit,
            unitPrice: material.unitPrice,
            _id: material._id
          });
        } else {
          materialsAccordingToSection.push({
            name: materialApplication,
            values: [
              {
                description: material.description,
                unit: material.unit,
                unitPrice: material.unitPrice,
                _id: material._id
              }
            ]
          });
        }
      });
    });
    return materialsAccordingToSection;
  }
};

export const individualItem = (roomRelatedInfo, room, section, title) => {
  return roomRelatedInfo
    .find((a) => a.name === section)
    .mainItems.find((b) => b.name === room)
    .values.find((c) => c.name === title);
};

export const roomInfo = (roomRelatedInfo, room, section) => {
  return roomRelatedInfo.find((a) => a.name === section).mainItems.find((b) => b.name === room);
};

export const sectionInfo = (roomRelatedInfo, section) =>
  roomRelatedInfo.find((a) => a.name === section);
