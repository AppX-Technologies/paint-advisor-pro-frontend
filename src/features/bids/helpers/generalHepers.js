import axios from 'axios';
import { cloneDeep } from 'lodash';
import uuid from 'react-uuid';
import { buttonStageInfo } from '../../../common/ButtonStageInfo';

import {
  FIELDS_WHERE_MATERIALS_ARE_APPLIES,
  NONPAINTABLEAREAFIELD
} from '../../../helpers/contants';

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

export const findSpecificMaterial = (companyMaterialList, specificMaterialId) => {
  const companyMaterialListClone = cloneDeep(companyMaterialList);
  const completeMaterial =
    companyMaterialListClone &&
    companyMaterialListClone.find((companyMaterial) => companyMaterial._id === specificMaterialId);

  delete completeMaterial._id;
  return completeMaterial;
};

export const findWheatherTheSectionIsCompletelyFilledOrNot = (roomsList, section) => {
  return (
    roomsList &&
    roomsList.every((room) =>
      room[section].every((individualSection) => individualSection?.materials !== '')
    )
  );
};

export const setMaterialsAccordingToSection = (pickerList) => {
  const materialsAccordingToSection = [];
  if (pickerList && pickerList[0]) {
    pickerList[0]?.materials.forEach((paint) => {
      paint?.appliesTo?.forEach((materialApplication) => {
        const foundMaterialSection = materialsAccordingToSection.find(
          (materialSection) => materialSection.name === materialApplication
        );
        if (foundMaterialSection) {
          foundMaterialSection.values.push({
            description: paint.description,
            unit: paint.unit,
            unitPrice: paint.unitPrice,
            paintId: paint._id,
            areaCoveredPerUnitForFirstCoat: paint.areaCoveredPerUnitForFirstCoat,
            arearCoveredPerUnitForRemainingCoats: paint.arearCoveredPerUnitForRemainingCoats
          });
        } else {
          materialsAccordingToSection.push({
            name: materialApplication,
            values: [
              {
                description: paint.description,
                unit: paint.unit,
                unitPrice: paint.unitPrice,
                paintId: paint._id,
                areaCoveredPerUnitForFirstCoat: paint.areaCoveredPerUnitForFirstCoat,
                arearCoveredPerUnitForRemainingCoats: paint.arearCoveredPerUnitForRemainingCoats
              }
            ]
          });
        }
      });
    });
    return materialsAccordingToSection;
  }
};

export const setLabourAccordingToSection = (pickerList) => {
  const labourAccordingToSection = [];
  if (pickerList) {
    pickerList?.forEach((picker) => {
      FIELDS_WHERE_MATERIALS_ARE_APPLIES.map((item) => item.label).forEach(
        (materialApplication) => {
          const foundMaterialSection = labourAccordingToSection.find(
            (materialSection) => materialSection.name === materialApplication
          );
          if (foundMaterialSection) {
            foundMaterialSection.values.push({
              name: picker.name,
              proficiency: picker.proficiency,
              labourId: picker._id
            });
          } else {
            labourAccordingToSection.push({
              name: materialApplication,
              values: [
                {
                  name: picker.name,
                  proficiency: picker.proficiency,
                  labourId: picker._id
                }
              ]
            });
          }
        }
      );
    });
    return labourAccordingToSection;
  }
};

export const individualItem = (currentClientInfo, room, section, title) => {
  return currentClientInfo?.bid?.rooms
    ?.find((roomInfoForIndividualItem) => roomInfoForIndividualItem.roomName === room)
    [section].find((individualEntity) => individualEntity.name === title);
};

export const roomInfo = (currentClientInfo, room, section) => {
  return currentClientInfo?.bid?.rooms?.find(
    (roomInformation) => roomInformation.roomName === room
  )[section];
};

export const sectionInfo = (currentClientInfo, section) => {
  return currentClientInfo?.bid?.rooms?.map((roomInfoForSection) => {
    return roomInfoForSection[section];
  });
};

export const checkWheatherEverySectionIsFilled = (rooms, field) => {
  const array = [];
  if (rooms) {
    rooms.forEach((room) => {
      Object.keys(room)
        .filter(
          (sections) =>
            sections !== 'roomName' &&
            sections !== '__v' &&
            sections !== '_id' &&
            sections !== NONPAINTABLEAREAFIELD
        )
        .forEach((sections) => {
          room[sections].forEach((section) => {
            if (
              !section?.[field] ||
              JSON.stringify(section?.[field]) === '{}' ||
              !Object.keys(section).includes(field)
            ) {
              array.push(false);
            } else {
              array.push(true);
            }
          });
        });
    });
  }

  if (field === 'materials') {
    console.log(array, 'arrayarrayarrayarray');
  }

  return !array.includes(false);
};

export const checkWheatherIndividualSectionIsFilled = (
  currentClientInfo,
  currentSection,
  pickerTitle
) => {
  const itemToWhichMaterialIsToBeAssigned = sectionInfo(currentClientInfo, currentSection);
  if (
    itemToWhichMaterialIsToBeAssigned?.every((roomDetails) =>
      roomDetails?.every((room) => !Object.keys(room[pickerTitle] ?? {}).length)
    )
  ) {
    return false;
  }
  return true;
};
