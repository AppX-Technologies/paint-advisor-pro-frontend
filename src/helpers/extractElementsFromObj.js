export const extractElement = (obj) => {
	const arrayOfElements = [];
	for (let key in obj) {
		arrayOfElements.push(obj[key]);
	}
	return arrayOfElements;
};
