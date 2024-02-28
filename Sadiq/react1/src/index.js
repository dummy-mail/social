import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import {combineReducers, configureStore} from '@reduxjs/toolkit'
import {Provider} from 'react-redux'
import InboxSlice from './redux/InboxSlice';
import MsgSlice from './redux/MsgSlice';

let allData = combineReducers({ InboxSlice, MsgSlice })

let Store = configureStore({
  reducer : allData
})


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={Store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </Provider>
  </React.StrictMode>
);


