export const filterProcessByBid = (processList, bidType) => {
	console.log(processList, bidType);
	return (
		processList[0] && processList[0].processes.filter((process) => process.bidType === bidType)
	);
};
