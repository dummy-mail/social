import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { API_URL } from '../util/API'

let getLoginUserData = createAsyncThunk('loginUserData', async (ID)=>{
    let response = await axios.get(`${API_URL}/user/authentication/accounts`, { headers : { Authorization : ID } })
    return response.data.loginUser
});
let clearUserData = createAsyncThunk('clearUserData', async (ID)=>{
    
});

let UserDataSlice = createSlice({
    name : "userData",
    initialState : [],
    extraReducers : builder =>{
        builder.addCase(getLoginUserData.fulfilled, (state, action)=>{
            return action.payload
        });
        builder.addCase(clearUserData.fulfilled, (state, action)=>{
            return []
        });
    }
});

export default UserDataSlice.reducer;
export { getLoginUserData, clearUserData};