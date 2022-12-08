export const filterProcessByBid = (processList, bidType, stage) => {
  const filteredProcessList =
    processList[0] &&
    processList[0].processes.filter((process) => {
      return process.bidType === bidType && stage ? process.stage === stage : null;
    });
  return filteredProcessList;
};

export const filterMaterialByBid = (materialList, bidType) => {
  const filteredMaterialList =
    materialList[0] &&
    materialList[0]?.materials.filter((material) => {
      return material.bidType === bidType;
    });
  return filteredMaterialList;
};
