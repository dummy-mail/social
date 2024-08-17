import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { API_URL } from '../util/API'
import { useSelector } from 'react-redux';
import socket from '../util/Socket'; // Import the socket instance


let getAllUserData = createAsyncThunk('allUserData', async(ID)=>{
    let response = await axios.get(`${API_URL}/user/authentication/social/site`, { headers : { Authorization : ID } })
    // console.log(response.data)
    return response.data
});

let clearAllUserData = createAsyncThunk('clearAllUserData', ()=>{
    return { allUser : [], senderData : [] }
})

let sendReq = createAsyncThunk('sendReq', async(object)=>{
    let response = await axios.post(`${API_URL}/user/authentication/social/follow`, object)
    let { senderid, receiverid } = object
    if(response.data.status === 200){
        socket.emit('sendFollowRequest', { senderId: senderid, receiverId: receiverid });
        return object
    }
});

let cancelReq = createAsyncThunk('cancelReq', async(object)=>{
    let response = await axios.post(`${API_URL}/user/authentication/social/cancelreq`, object)
    if(response.data.status === 200){
        return object
    }
});

let rejectReq = createAsyncThunk('rejectReq', async(object)=>{
    let response = await axios.post(`${API_URL}/user/authentication/social/rejectreq`, object);
    let { senderid, receiverid } = object
    if(response.data.status === 200){
        socket.emit('rejectFollowRequest', { senderId: senderid, receiverId: receiverid });
        return object
    }
});

let acceptRec = createAsyncThunk('acceptRec', async(object)=>{
    let response = await axios.post(`${API_URL}/user/authentication/social/acceptrec`, object);
    let { senderid, receiverid } = object
    if(response.data.status === 200){
        socket.emit('acceptFollowRequest', { senderId: senderid, receiverId: receiverid });
        return object
    }
});

let unFollowReq = createAsyncThunk('unFollowReq', async(object)=>{
    let response = await axios.post(`${API_URL}/user/authentication/social/unfollow`, object);
    if(response.data.status === 200){
        return object
    }
});

let handleReceiveReq = createAsyncThunk('handleReceiveReq', async(object)=>{
    return object
});

let handleAcceptReq = createAsyncThunk('handleAcceptReq', async(object)=>{
    return object
});

let handleRejectReq = createAsyncThunk('handleRejectReq', async(object)=>{
    return object
});


let initialState = {
    allUser : [],
    senderData : [],
    receiverData : [],
    followinglist : [],
    followerlist : [],
}


let AllUserDataSlice = createSlice({
    name : "allUserData",
    initialState : initialState,    
    extraReducers : builder =>{
        builder.addCase(getAllUserData.fulfilled, (state, action)=>{
            state.senderData = action.payload.senderReceiverData.senderData;
            state.allUser = action.payload.accounts;
            state.receiverData = action.payload.senderReceiverData.receiverData;
            state.followinglist = action.payload.followerFollowingData.followinglist;
            state.followerlist = action.payload.followerFollowingData.followerlist;
        });

        builder.addCase(sendReq.fulfilled, (state, action)=>{
            state.senderData?.push(action?.payload);   
        });

        builder.addCase(cancelReq.fulfilled, (state, action)=>{
            let { senderid, receiverid } = action?.payload;
            state.senderData = state.senderData.filter(value => value?.receiverid != receiverid || value?.senderid != senderid)
        });

        builder.addCase(rejectReq.fulfilled, (state, action)=>{
            let { senderid, receiverid } = action?.payload;
            state.receiverData = state.receiverData?.filter(value => value?.receiverid != receiverid && value?.senderid != senderid)
        });

        builder.addCase(handleRejectReq.fulfilled, (state, action)=>{
            let { senderid, receiverid } = action?.payload;
            state.senderData = state.senderData?.filter(value => value?.receiverid != receiverid && value?.senderid != senderid)
        });
        
        builder.addCase(acceptRec.fulfilled, (state, action)=>{
            let { senderid, receiverid } = action?.payload;
            state.followerlist?.push(senderid);
            state.receiverData = state.receiverData?.filter(value => value?.receiverid != receiverid || value?.senderid != senderid)
        });

        builder.addCase(unFollowReq.fulfilled, (state, action)=>{
            let { receiverid } = action?.payload;
            state.followinglist = state.followinglist?.filter(value => value !== receiverid)
        });

        builder.addCase(handleReceiveReq.fulfilled, (state, action)=>{
            state.receiverData?.push(action?.payload);    
        });

        builder.addCase(handleAcceptReq.fulfilled, (state, action)=>{
            let { senderid, receiverid } = action?.payload;
            state.followinglist?.push(receiverid);
            state.senderData = state.receiverData?.filter(value => value?.receiverid != receiverid || value?.senderid != senderid)   
        });

        builder.addCase(clearAllUserData.fulfilled, (state, action)=>{
            state.senderData = [];
            state.allUser = [];
            state.receiverData = []
            state.followinglist = []
            state.followerlist = []
        });
    }
});

export default AllUserDataSlice.reducer;
export {getAllUserData, sendReq, cancelReq, clearAllUserData, rejectReq, acceptRec, unFollowReq, handleReceiveReq, handleAcceptReq, handleRejectReq};