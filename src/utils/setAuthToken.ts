import http from './http-common';

const setAuthToken = (token: any) => {
	if (token) {
		http.defaults.headers.common['auth-token'] = token;
	} else {
		delete http.defaults.headers.common['auth-token'];
	}
};

export default setAuthToken;
