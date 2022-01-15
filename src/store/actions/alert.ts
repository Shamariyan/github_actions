import { Actiontype } from '../action-types/types';
import { Dispatch } from 'redux';


export const setAlert = (msg: string, alertType: string) => {

	return (dispatch: Dispatch) => {
		const id = Math.floor(Math.random() * 10000 + 1);
		console.log(id);
		dispatch({
			type: Actiontype.SET_ALERT,
			payload: { msg, alertType, id },
		});
		setTimeout(() => {
			dispatch({ type: Actiontype.REMOVE_ALERT, payload: { id } });
		}, 5000);
	};
};

export const removeAlert = (id:number)=>{
	return (dispatch:Dispatch)=>{
	dispatch({ type: Actiontype.REMOVE_ALERT, payload: { id } });
	}
}
