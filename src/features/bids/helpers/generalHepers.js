import axios from 'axios';
import { buttonStageInfo } from '../../../common/ButtonStageInfo';

export const findCurrentStageButtonInfo = (stageName) => {
  return buttonStageInfo.find((info) => info.name === stageName);
};

export const findCurrentClient = (clientList, selectedListItem) => {
  return clientList.find((client) => client._id === selectedListItem);
};

export const searchedResult = (list, keyword) => {
  return list.filter((item) => item.name.toLowerCase().includes(keyword.toLowerCase()));
};

export const findCommentsUniquely = (originalCommentList, searchValue) => {
  return originalCommentList.filter((comment) => comment.name === searchValue);
};

export const filterClientsBySelectedStep = (clients, selectedStep) => {
  return clients.filter((client) => client.status === selectedStep);
};

export const readFile = async ({ fileName, mimeType, token }) => {
  try {
    const response = await axios.get(
      `https://painting-app-backend.herokuapp.com/api/files/stream/${fileName}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
    );
    console.log(response);
    if (response.status < 200 || response.status >= 300) {
      if (response.status === 401) {
        setTimeout(() => {
          localStorage.clear();
          window.location.reload();
        }, 1500);
        return { error: 'Your session has expired, please try logging in again!' };
      }
    } else {
      const blobFromResponse = await response.blob();
      const blobWithFileMimeType = new Blob([blobFromResponse], { type: mimeType });
      const returnValue = URL.createObjectURL(blobWithFileMimeType);
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
