import { Actiontype } from '../action-types/types';
import { LoginAction } from './interfaces';

interface authState {
	token: string | null;
	isAuthenticated: boolean | null;
	loading: boolean | null;
	user: any;
	isValidNumber?: boolean | null;
	currentOrder: any;
	previousOrders: Array<any>;
	isLoginModalOpen: boolean;
}

const initialState = {
	token: localStorage.getItem('token'),
	isAuthenticated: null,
	loading: true,
	user: null,
	isValidNumber: null,
	currentOrder: null,
	previousOrders: [],
	isLoginModalOpen: false,
};

export default function (state: authState = initialState, action: LoginAction) {
	switch (action.type) {
		case Actiontype.OTPSENT_SUCCESS:
			return {
				...state,
				isValidNumber: true,
			};
		case Actiontype.OTPSENT_FAIL:
			return {
				...state,
				isValidNumber: null,
			};
		case Actiontype.USER_LOADED:
			return {
				...state,
				isAuthenticated: true,
				loading: false,
				user: action.payload,
			};
		case Actiontype.LOGIN_SUCCESS:
			localStorage.setItem('token', action.payload.token);
			return {
				...state,
				...action.payload,
				isAuthenticated: true,
				loading: false,
			};
		case Actiontype.UPDATE_QUANTITY:
		case Actiontype.ADD_ADDRESS:
			return {
				...state,
				user: action.payload,
				loading: false,
			};
		case Actiontype.ADD_TO_CART:
			return {
				...state,
				user: action.payload,
				loading: false,
			};
		case Actiontype.GET_ORDERS:
			return {
				...state,
				previousOrders: action.payload,
				loading: false,
			};
		case Actiontype.DELETE_CART_ITEM:
			return {
				...state,
				user: action.payload,
				loading: false,
			};
		case Actiontype.PLACE_ORDER:
			return {
				...state,
				currentOrder: action.payload,
				loading: false,
			};
		case Actiontype.LOGIN_FAIL:
		case Actiontype.AUTH_ERROR:
		case Actiontype.LOGOUT:
			localStorage.removeItem('token');
			return {
				...state,
				token: null,
				isAuthenticated: null,
				loading: false,
			};
		case Actiontype.CHANGE_LOGIN_MODAL:
			return {
				...state,
				isLoginModalOpen: action.payload,
				loading: false,
			};
		default:
			return state;
	}
}
