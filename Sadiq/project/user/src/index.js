import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux'
import UserDataSlice from './redux/UserDataSlice';
import AllUserDataSlice from './redux/AllUserDataSlice';

let rootReducer = combineReducers({ UserDataSlice, AllUserDataSlice }) //to combine more than one reducers

let store = configureStore({
  reducer : rootReducer
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

