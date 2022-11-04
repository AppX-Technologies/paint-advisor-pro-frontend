export const extractElement = (obj) => {
	const arrayOfElements = [];
	for (let key in obj) {
		arrayOfElements.push(obj[key]);
	}
	//test push
	return arrayOfElements;
};
