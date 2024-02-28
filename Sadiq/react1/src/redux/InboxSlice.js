import { createSlice } from "@reduxjs/toolkit";

let data = [
    {
        id : 1,
        name : "rohit",
        age : 24,
        city : "indore",
        salary : 4000
    },
    {
        id : 2,
        name : "Amar",
        age : 21,
        city : "Mumbai",
        salary : 2500
    },
    {
        id : 3,
        name : "Shamim",
        age : 29,
        city : "Pune",
        salary : 6800
    },
    {
        id : 4,
        name : "Alefiya",
        age : 20,
        city : "indore",
        salary : 10000
    },
    {
        id : 5,
        name : "Suds",
        age : 20,
        city : "indore",
        salary : 7800
    }
]

let InboxSlice = createSlice({
    name : "inbox",
    initialState : data,
    reducers : {
        dlt(curr_state ,id){
            return curr_state.filter(value => value.id != id.payload)
        }
    }
})

export default InboxSlice.reducer;
export let {dlt} = InboxSlice.actions;