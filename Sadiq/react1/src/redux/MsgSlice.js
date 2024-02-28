import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

let MsgSlice = createSlice({
    name : "messageSlice",
    initialState : [
        {
            id : 1,
            userid : 1,
            msg : "hi"
        },
        {
            id : 2,
            userid : 2,
            msg : "hello"
        },
        {
            id : 3,
            userid : 1,
            msg : "how are you ?"
        },
        {
            id : 4,
            userid : 2,
            msg : "i am fine"
        },
    ],
    reducers : {

    }
})

export default MsgSlice.reducer;