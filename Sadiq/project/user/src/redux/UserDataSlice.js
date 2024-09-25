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

const userRefSubmit = createAsyncThunk('userRefSubmit', async(object) =>{
    let response = await axios.post(`${API_URL}/user/authentication/referral`, object )
    if(response.data.status === 200) {
        let {referralcode} = object?.formdata;
        return referralcode
    }
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
        builder.addCase(userRefSubmit.fulfilled, (state, action)=>{
            state.usereferral = action.payload;
        });
    }
});

export default UserDataSlice.reducer;
export { getLoginUserData, clearUserData, userRefSubmit};