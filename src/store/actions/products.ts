import { Dispatch } from 'redux';
import http from '../../utils/http-common';
import { Actiontype } from '../action-types/types';
import { setAlert } from './alert';

export const getProduct = (_id: number) => {
	return async (dispatch: Dispatch) => {
		try {
			// const res = await http.get(`api/database/product/${_id}`);
			// const obj = array.find((item) => {
			// 	return item.id === id;
			// });
			dispatch({ type: Actiontype.GET_PRODUCT, payload: _id });
		} catch (error) {
			console.log('Cannot get the specified product');
		}
	};
};

export const getProducts = () => {
	return async (dispatch: Dispatch) => {
		try {
			const res = await http.get(`api/database/product`);
			dispatch({ type: Actiontype.GET_PRODUCTS, payload: res.data });
		} catch (error) {
			console.log('Cannot get all products');
		}
	};
};

export const getFilteredProducts = (text: string) => {
	return async (dispatch: Dispatch) => {
		try {
			dispatch({ type: Actiontype.UPDATE_FILTERED_PRODUCTS, payload: text });
		} catch (error) {
			console.log('Filtered products issue');
		}
	};
};

export const setFiltersArray = (text: string) => {
	return async (dispatch: Dispatch) => {
		try {
			dispatch({ type: Actiontype.UPDATE_FILTERED_ARRAY, payload: text });
		} catch (error) {
			console.log('Filtered products issue');
		}
	};
};

export const sortProducts = (array: Array<any>) => {
	return async (dispatch: Dispatch) => {
		try {
			dispatch({ type: Actiontype.SORT_ACTION, payload: array });
		} catch (error) {
			console.log('Sort products issue');
		}
	};
};

export const filterByType = (text: string) => {
	return async (dispatch: Dispatch) => {
		try {
			dispatch({ type: Actiontype.FILTER_BY_TYPE, payload: text });
		} catch (error) {
			console.log(error);
		}
	};
};
export const addAddress = (data: any) => {
	return async (dispatch: Dispatch) => {
		dispatch({ type: Actiontype.SET_DELIVERY_ADDRESS, payload: data });
	};
};

// export const updateQuantity = (array: any) => {
// 	return async (dispatch: Dispatch) => {
// 		dispatch({ type: Actiontype.UPDATE_QUANTITY, payload: array });
// 	};
// };
