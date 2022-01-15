import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import products from './products';

const reducers = combineReducers({
	alert: alert,
	auth: auth,
	products: products,
});

export default reducers;

export type State = ReturnType<typeof reducers>;
