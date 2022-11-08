import { buttonStageInfo } from '../../../common/ButtonStageInfo';

export const findCurrentStageButtonInfo = (stageName) => {
  return buttonStageInfo.find((info) => info.name === stageName);
};
