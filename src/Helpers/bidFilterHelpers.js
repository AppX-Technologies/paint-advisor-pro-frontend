export const filterProcessByBid = (processList, bidType, stage) => {
	const filteredProcessList =
		processList[0] &&
		processList[0].processes.filter((process) => {
			return process.bidType === bidType && stage ? process.stage === stage : null;
		});
	return filteredProcessList;
};
