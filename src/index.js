import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
//Redux
import { Provider } from 'react-redux';
import rootReducer from './reducers/reducer';
import { applyMiddleware, createStore } from 'redux';
// import { loadEmployees } from './actions/action-creators';
// import * as ActionTypes from './actions/actions-types'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(rootReducer, composeWithDevTools(
  applyMiddleware(thunk))
);

// //This will load initial data as specified blank in action-creator.js
// console.log(store.getState());
// let sampledata = [
//   { LocationID: 'Mum', Name: 'ABC', Age: 30, Designation: 'mgr', Department: 'HR', Location: 'MUM', EmpCode: 'EMP1' },
//   { LocationID: 'AMB', Name: 'ABC', Age: 30, Designation: 'mgr', Department: 'HR', Location: 'MUM', EmpCode: 'EMP2' }
// ];

// //For testing create object and send it will show the 2 data as below
// store.dispatch({
//   type: ActionTypes.GET_EMPLOYEES,
//   payload: sampledata
// });

console.log(store.getState());

ReactDOM.render(
  // //Before Redux
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>,
  // document.getElementById('root')

  //With Redux
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
