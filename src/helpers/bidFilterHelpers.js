export const filterProcessByBid = (processList, bidType, stage) => {
  const filteredProcessList =
    processList[0] &&
    processList[0].processes.filter((process) => {
      return process.bidType === bidType && stage ? process.stage === stage : null;
    });
  return filteredProcessList;
};

export const filterMaterialByBid = (list, bidType) => {
  const filteredList =
    list[0] &&
    list[0]?.materials.filter((material) => {
      return material.bidType === bidType;
    });
  return filteredList;
};

export const filterProductionRateByBid = (list, bidType) => {
  const filteredList = list?.filter((productionRate) => {
    return productionRate.bidType === bidType;
  });
  return filteredList;
};
