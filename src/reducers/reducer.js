//Return all the combined reducer to Store. Store contains multiple reducers. Thats y all the reducers are combined in this file.

import { combineReducers } from "redux";
import employeeReducer from "./employee-reducer";

const rootReducer = combineReducers({
    employeeState: employeeReducer,
    // complaintsState:complaintReducer //If reducer is complaint created
    //Add more reducers
})

export default rootReducer;