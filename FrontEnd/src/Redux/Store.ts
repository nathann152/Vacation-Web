import {  authReducer } from './AuthState';
import { combineReducers, createStore } from "redux";
import { vacationsReducer } from "./VacationState";


const reducers =combineReducers({
    vacationState: vacationsReducer,
    authState:authReducer
});


const store = createStore(reducers)

export default store