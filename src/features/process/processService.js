import axios from "axios";

const endpoint = "https://painting-app-backend.herokuapp.com/processes";
const CREATE_PROCESS = `${endpoint}/`;
const FETCH_PROCESS = `https://painting-app-backend.herokuapp.com/processes/list`;
const UPDATE_PROCESS = `${endpoint}/`;
const DELETE_PROCESS = `${endpoint}/`;

const fetchProcess = async (userData) => {
	const config = {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${userData.token}`
		}
	};
	const response = await axios.post(
		FETCH_PROCESS,
		{
			filter: userData.id ? { _id: userData.id } : { global: true }
		},
		config
	);
	return response.data;
};

const fetchSingleProcess = async (userData) => {
	const config = {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${userData.token}`
		}
	};
	delete userData.token;
	const response = await axios.post(FETCH_PROCESS, userData, config);
	return response.data[0];
};

const createProcess = async (userData) => {
	console.log(userData, "Createajaj");
	const config = {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${userData.token}`
		}
	};
	delete userData.token;
	const response = await axios.put(
		CREATE_PROCESS + `/${userData.ID}`,
		{
			processes: userData.add
				? [
						...userData.previousProcesses,
						{ description: userData.description, bidType: userData.bidType }
				  ]
				: userData.previousProcesses.filter(
						(previousProcess) => previousProcess._id !== userData.idToBeDeleted
				  )
		},
		config
	);
	return response.data;
};

const updateProcess = async (userData) => {
	const config = {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${userData.token}`
		}
	};
	delete userData.token;
	const response = await axios.put(`${UPDATE_PROCESS}${userData.id}`, userData, config);
	return response.data;
};

const deleteProcess = async (userData) => {
	const config = {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${userData.token}`
		}
	};
	delete userData.token;
	const response = await axios.delete(`${DELETE_PROCESS}${userData.id}`, config);
	return response.data;
};

const processService = {
	fetchProcess,
	createProcess,
	updateProcess,
	deleteProcess,
	fetchSingleProcess
};
export default processService;
