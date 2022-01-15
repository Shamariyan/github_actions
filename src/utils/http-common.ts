import axios from 'axios';

export default axios.create({
	baseURL: 'https://onecbackend.herokuapp.com',
	// baseURL: 'http://localhost:5000',
	headers: {
		'Content-type': 'application/json',
	},
	timeout: 20000,
});
