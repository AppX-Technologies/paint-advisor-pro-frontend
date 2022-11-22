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
