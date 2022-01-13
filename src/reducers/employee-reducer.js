//Reducer will communicate and change the state value. 
import * as ActionTypes from '../actions/actions-types'

const initialState = {
    employees: [
        // { LocationID: 'Mum', Name: 'Nikhil EV', Age: 31, Designation: 'Manager', Department: 'MSTC', Location: 'Mumbai', EmpCode: 'EMP1' },
        // { LocationID: 'AMB', Name: 'Arun Lal', Age: 33, Designation: 'Deputy Manager', Department: 'HR', Location: 'Ambernath', EmpCode: 'EMP2' }
    ],
    employee: undefined
}

function employeeReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (action.type) {
        case ActionTypes.ADD_EMPLOYEE:
            state = { ...state, employees: [...state.employees, payload] }
            return state;
        case ActionTypes.DELETE_EMPLOYEE:
            let deletedItem = state.employees.find(item => item.LocationID === payload.locationId && item.EmpCode === payload.empCode)
            console.log("Splice Index : ", deletedItem);
            return { ...state, employees: state.employees.filter(item => item != deletedItem) }
        case ActionTypes.GET_EMPLOYEES:
            return { ...state, employees: payload }
        case ActionTypes.GET_EMPLOYEE:
            return { ...state, employee: payload }
        default:
            return state;

    }
}

export default employeeReducer;