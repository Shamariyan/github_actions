import { AlertAction } from "./interfaces";
import { Actiontype } from "../action-types/types";


interface alertItem {
    id: number; msg?: string; alertType?:string
}


interface Initialstate extends Array<alertItem>{}

const initialState: Initialstate =[]

export default function alert (state:Initialstate=initialState,action:AlertAction){
    const {type,payload} = action
    switch(type){
        case Actiontype.SET_ALERT:
            return [...state, payload];
        case Actiontype.REMOVE_ALERT:
            return state = state.filter((item) =>item.id !== payload.id)
        default:
            return state
        }
}