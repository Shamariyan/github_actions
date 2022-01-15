import axios from 'axios';
import { Dispatch } from 'redux';
import http from '../../utils/http-common';
import setAuthToken from '../../utils/setAuthToken';
import { Actiontype } from '../action-types/types';
import { setAlert } from './alert';

export const loadUser = () => {
	return async (dispatch: Dispatch) => {
		if (localStorage.token) {
			setAuthToken(localStorage.token);
		}
		try {
			const res = await http.get('api/auth/user');
			dispatch({ type: Actiontype.USER_LOADED, payload: res.data });
		} catch (err) {
			dispatch({ type: Actiontype.AUTH_ERROR });
		}
	};
};

export const sendOtp = (phoneNumber: string) => {
	return async (dispatch: Dispatch) => {
		const body = JSON.stringify({ phoneNumber });

		try {
			const res = await http.post('/api/auth/otp', body);
			dispatch({ type: Actiontype.OTPSENT_SUCCESS });
		} catch (err: any) {
			const errors = err.response.data.errors;
			dispatch({ type: Actiontype.OTPSENT_FAIL });
			if (errors) {
				errors.forEach((error: any) => {
					return dispatch<any>(setAlert(error.msg, 'error'));
				});
			}
		}
	};
};

export const verifyOtp = (phoneNumber: string, otp: string) => {
	return async (dispatch: Dispatch) => {
		const body = JSON.stringify({ phoneNumber, otp });
		try {
			const res = await http.post('api/auth/otpverify', body);

			res.data
				? (dispatch({ type: Actiontype.LOGIN_SUCCESS, payload: res.data }),
				  dispatch<any>(loadUser()),
				  dispatch<any>(setAlert('Logged in Successfully', 'success')))
				: null;
		} catch (err: any) {
			const errors = err.response.data.errors;
			dispatch({ type: Actiontype.LOGIN_FAIL });
			if (errors) {
				errors.forEach((error: any) => {
					return dispatch<any>(setAlert(error.msg, 'error'));
				});
			}
		}
	};
};

export const addItemToCart = (object: any) => {
	return async (dispatch: Dispatch) => {
		const productId = object._id;
		const weight = object.kg;
		const units = 1;

		const body = JSON.stringify({ productId, weight, units });

		try {
			const res = await http.post('api/user/cart', body);
			return res.data
				? (dispatch({ type: Actiontype.ADD_TO_CART, payload: res.data }),
				  dispatch<any>(setAlert('Item added to cart', 'success')))
				: null;
		} catch (err: any) {
			const errors = err.response.data.errors;
			// dispatch({ type: Actiontype.LOGIN_FAIL });
			if (errors) {
				errors.forEach((error: any) => {
					return dispatch<any>(setAlert(error.msg, 'error'));
				});
			}
		}
	};
};

export const deleteCartItem = (productId: { productId: string }) => {
	return async (dispatch: Dispatch) => {
		console.log('delete item');
		const res = await http.delete(`api/user/cart/${productId}`);
		res.data
			? dispatch({ type: Actiontype.DELETE_CART_ITEM, payload: res.data })
			: null;
	};
};
export const deleteCart = () => {
	return async (dispatch: Dispatch) => {
		console.log('delete item');
		const res = await http.delete(`api/user/cart`);
		res.data
			? dispatch({ type: Actiontype.DELETE_CART_ITEM, payload: res.data })
			: null;
	};
};

export const updateProfile = (name: string, email?: string) => {
	return async (dispatch: Dispatch) => {
		let userName;
		let emailId;

		if (name) userName = name;
		if (email) emailId = email;

		const body = JSON.stringify({ userName, emailId });

		try {
			const res = await http.post(`api/user`, body);
			res.data
				? dispatch({ type: Actiontype.UPDATE_QUANTITY, payload: res.data })
				: dispatch<any>(setAlert('Profile not updated', 'error'));
		} catch (err: any) {
			const errors = err.response.data.errors;
			// dispatch({ type: Actiontype.LOGIN_FAIL });
			if (errors) {
				errors.forEach((error: any) => {
					return dispatch<any>(setAlert(error.msg, 'error'));
				});
			}
		}
	};
};

export const addAddress = (add: {
	name: string;
	address: string;
	pinCode: string;
	phoneNumber: string;
}) => {
	return async (dispatch: Dispatch) => {
		let address;

		if (add) address = add;

		const body = JSON.stringify({ address });

		try {
			const res = await http.post(`api/user/address`, body);
			res.data
				? (dispatch({ type: Actiontype.UPDATE_QUANTITY, payload: res.data }),
				  dispatch<any>(setAlert('Address successfully updated', 'success')))
				: null;
		} catch (err: any) {
			const errors = err.response.data.errors;
			if (errors) {
				errors.forEach((error: any) => {
					return dispatch<any>(setAlert(error.msg, 'error'));
				});
			}
		}
	};
};

export const updateCart = (array: any) => {
	return async (dispatch: Dispatch) => {
		const cartItems = array;
		const body = JSON.stringify({ cartItems });
		try {
			const res = await http.put('api/user/cart', body);
			res.data
				? dispatch({ type: Actiontype.UPDATE_QUANTITY, payload: res.data })
				: null;
		} catch (err: any) {
			const errors = err.response.data.errors;
			// dispatch({ type: Actiontype.LOGIN_FAIL });
			if (errors) {
				errors.forEach((error: any) => {
					return dispatch<any>(setAlert(error.msg, 'error'));
				});
			}
		}
	};
};

export const placeOrder = (data: any) => {
	return async (dispatch: Dispatch) => {
		const body = JSON.stringify(data);
		try {
			const res = await http.post('api/order', body);
			dispatch({ type: Actiontype.PLACE_ORDER, payload: res.data });
			dispatch<any>(getPreviousOrders());
			dispatch<any>(setAlert('Order placed successfully', 'success'));
		} catch (err: any) {
			const errors = err.response.data.errors;
			if (errors) {
				errors.forEach((error: any) => {
					return dispatch<any>(setAlert(error.msg, 'error'));
				});
			}
		}
	};
};

export const getPreviousOrders = () => {
	return async (dispatch: Dispatch) => {
		try {
			const res = await http.get('api/order/user');
			res.data
				? dispatch({ type: Actiontype.GET_ORDERS, payload: res.data })
				: null;
		} catch (err: any) {
			const errors = err.response.data.errors;
			if (errors) {
				errors.forEach((error: any) => {
					return dispatch<any>(setAlert(error.msg, 'error'));
				});
			}
		}
	};
};

export const logOut = () => {
	return (dispatch: Dispatch) => {
		dispatch({ type: Actiontype.LOGOUT });
		dispatch<any>(setAlert('Logged out of your account', 'success'));
	};
};

export const changeLoginModal = (openBool: boolean) => {
	return (dispatch: Dispatch) => {
		dispatch({ type: Actiontype.CHANGE_LOGIN_MODAL, payload: openBool });
	};
};
