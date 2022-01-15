import { Actiontype } from '../action-types/types';

interface RemoveAlertAction {
	type: Actiontype.REMOVE_ALERT;
	payload: {
		id: number;
	};
}
interface AddAlertAction {
	type: Actiontype.SET_ALERT;
	payload: {
		id: number;
		msg: string;
		alertType: string;
	};
}
export type AlertAction = AddAlertAction | RemoveAlertAction;

interface LoginSuccessAction {
	type: Actiontype.LOGIN_SUCCESS;
	payload: {
		token: string;
		isAuthenticated: boolean | null;
		loading: boolean | null;
		user: any | null;
	};
}

interface LoginFailAction {
	type: Actiontype.LOGIN_FAIL;
	payload: {
		token: string;
		isAuthenticated: boolean | null;
		loading: boolean | null;
		user: any | null;
	};
}

interface OtpSuccessAction {
	type: Actiontype.OTPSENT_SUCCESS;
}

interface OtpFailAction {
	type: Actiontype.OTPSENT_FAIL;
}

interface UserLoaded {
	type: Actiontype.USER_LOADED;
	payload: any;
}
interface AuthError {
	type: Actiontype.AUTH_ERROR;
}
interface LogOut {
	type: Actiontype.LOGOUT;
}
interface addToCart {
	type: Actiontype.ADD_TO_CART;
	payload: any;
}
interface updateCart {
	type: Actiontype.UPDATE_QUANTITY;
	payload: any;
}
interface deleteCart {
	type: Actiontype.DELETE_CART_ITEM;
	payload: any;
}

interface placeOrder {
	type: Actiontype.PLACE_ORDER;
	payload: any;
}
interface userAddress {
	type: Actiontype.ADD_ADDRESS;
	payload: any;
}
interface getOrders {
	type: Actiontype.GET_ORDERS;
	payload: Array<any>;
}

interface changeLoginModal {
	type: Actiontype.CHANGE_LOGIN_MODAL;
	payload: boolean;
}

export type LoginAction =
	| LoginSuccessAction
	| LoginFailAction
	| OtpSuccessAction
	| OtpFailAction
	| UserLoaded
	| AuthError
	| LogOut
	| deleteCart
	| placeOrder
	| updateCart
	| addToCart
	| getOrders
	| userAddress
	| changeLoginModal;

interface getProduct {
	type: Actiontype.GET_PRODUCT;
	payload: any;
}
interface getAllProducts {
	type: Actiontype.GET_PRODUCTS;
	payload: any;
}

interface addAddress {
	type: Actiontype.SET_DELIVERY_ADDRESS;
	payload: any;
}
interface sortAction {
	type: Actiontype.SORT_ACTION;
	payload: Array<any>;
}

interface updateFilteredProduct {
	type: Actiontype.UPDATE_FILTERED_PRODUCTS;
	payload: { text: string };
}
interface updateFiltersArray {
	type: Actiontype.UPDATE_FILTERED_ARRAY;
	payload: { text: string };
}
interface filterByType {
	type: Actiontype.FILTER_BY_TYPE;
	payload: any;
}

export type ProductsAction =
	| getAllProducts
	| getProduct
	| addAddress
	| sortAction
	| filterByType
	| updateFilteredProduct
	| updateFiltersArray;
