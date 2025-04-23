import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { thunk } from "redux-thunk";
import BusReducer from "../reducers/BusReducer";
import StudentReducer from "../reducers/StudentReducer";
import AttendenceReducer from "../reducers/AttendenceReducer";


const rootReducer = combineReducers({
    "bus": BusReducer,
    "student": StudentReducer,
    "attendence": AttendenceReducer,
    
});

const mystore = legacy_createStore(rootReducer, applyMiddleware(thunk));

export default mystore;
