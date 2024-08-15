import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { API_URL } from '../util/API'
import { useSelector } from 'react-redux';



let getAllUserData = createAsyncThunk('allUserData', async(ID)=>{
    let response = await axios.get(`${API_URL}/user/authentication/social/site`, { headers : { Authorization : ID } })
    return response.data
});

let clearAllUserData = createAsyncThunk('clearAllUserData', ()=>{
    return { allUser : [], senderData : [] }
})

let sendReq = createAsyncThunk('sendReq', async(object)=>{
    
    let response = await axios.post(`${API_URL}/user/authentication/social/follow`, object)
    if(response.data.status === 200){
        return object
    }
});

let cancelReq = createAsyncThunk('cancelReq', async(object)=>{
    let response = await axios.post(`${API_URL}/user/authentication/social/cancelreq`, object)
    if(response.data.status === 200){
        return object
    }
});

let rejectRec = createAsyncThunk('rejectRec', async(object)=>{
    let response = await axios.post(`${API_URL}/user/authentication/social/rejectrec`, object);
    if(response.data.status === 200){
        return object
    }
});

let initialState = {
    allUser : [],
    senderData : [],
    receiverData : []
}


let AllUserDataSlice = createSlice({
    name : "allUserData",
    initialState : initialState,    
    extraReducers : builder =>{
        builder.addCase(getAllUserData.fulfilled, (state, action)=>{
            state.senderData = action.payload.senderData;
            state.allUser = action.payload.accounts;
            state.receiverData = action.payload.receiverData;
        });
        builder.addCase(sendReq.fulfilled, (state, action)=>{
            state.senderData.push(action?.payload);   
        });
        builder.addCase(cancelReq.fulfilled, (state, action)=>{
            let { senderid, receiverid } = action?.payload;
            state.senderData = state.senderData.filter(value => value?.receiverid != receiverid || value?.senderid != senderid)
        });
        builder.addCase(rejectRec.fulfilled, (state, action)=>{
            let { senderid, receiverid } = action?.payload;
            state.receiverData = state.receiverData?.filter(value => value?.receiverid != senderid || value?.senderid != receiverid)
        });
        builder.addCase(clearAllUserData.fulfilled, (state, action)=>{
            state.senderData = [];
            state.allUser = [];
            state.receiverData = []
        });
    }
});

export default AllUserDataSlice.reducer;
export {getAllUserData, sendReq, cancelReq, clearAllUserData};