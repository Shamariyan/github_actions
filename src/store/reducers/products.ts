import { Actiontype } from '../action-types/types';
import { ProductsAction } from './interfaces';

interface productState {
	product: any;
	products: Array<any>;
	filteredProducts: Array<any>;
	filtersArray: Array<any>;
	loading: boolean;
	cart: Array<any>;
	error: any;
	address: any;
}

const initialState = {
	product: null,
	products: [],
	filteredProducts: [],
	filtersArray: [],
	loading: true,
	cart: [],
	error: {},
	address: {},
};

export default function (
	state: productState = initialState,
	action: ProductsAction
) {
	switch (action.type) {
		case Actiontype.GET_PRODUCT:
			return {
				...state,
				product: state.products.find((item) => item._id === action.payload),
				loading: false,
			};
		case Actiontype.GET_PRODUCTS:
			return {
				...state,
				products: action.payload,
				loading: false,
			};
		case Actiontype.UPDATE_FILTERED_PRODUCTS:
			return {
				...state,
				filteredProducts: state.products.filter((prod) => {
					if (
						prod.productTags
							.map((item: string) => item.toLowerCase())
							.includes(action.payload) ||
						prod.productName.toLowerCase().includes(action.payload) ||
						prod.type.toLowerCase().includes(action.payload) ||
						prod.category.toLowerCase().includes(action.payload)
					) {
						return prod;
					}
				}),
				filtersArray: state.products.filter((prod) => {
					if (
						prod.productTags
							.map((item: string) => item.toLowerCase())
							.includes(action.payload) ||
						prod.productName.toLowerCase().includes(action.payload) ||
						prod.type.toLowerCase().includes(action.payload) ||
						prod.category.toLowerCase().includes(action.payload)
					) {
						return prod;
					}
				}),
				loading: false,
			};
		case Actiontype.UPDATE_FILTERED_ARRAY:
			return {
				...state,
				filtersArray: state.filteredProducts.filter((prod) => {
					if (prod.type.includes(action.payload)) {
						return prod;
					}
				}),
				loading: false,
			};
		case Actiontype.FILTER_BY_TYPE:
			return {
				...state,
				filtersArray: state.filteredProducts.filter((prod) => {
					if (prod.type.includes(action.payload)) {
						return prod;
					}
				}),
				loading: false,
			};
		case Actiontype.SORT_ACTION:
			return {
				...state,
				filteredProducts: action.payload,
				loading: false,
			};
		case Actiontype.SET_DELIVERY_ADDRESS:
			return {
				...state,
				address: action.payload,
				loading: false,
			};

		default:
			return state;
	}
}
