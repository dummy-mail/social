import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { API_URL } from '../util/API'
import socket from '../util/Socket'

let getLoginUserData = createAsyncThunk('loginUserData', async (ID)=>{
    let response = await axios.get(`${API_URL}/user/authentication/accounts`, { headers : { Authorization : ID } })
    return response.data.loginUser
});

let clearUserData = createAsyncThunk('clearUserData', async (ID)=>{
    return []
});

let handleSocketId = createAsyncThunk('handleSocketId', () =>{
    return socket.id
})


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
        // builder.addCase(handleSocketId.fulfilled, (state, action)=>{
        //     return state[0].otp = action?.payload
        // });
    }
});

export default UserDataSlice.reducer;
export { getLoginUserData, clearUserData};