import React, { useEffect, useState } from 'react'
import Footer from '../../shared/Footer'
import Header from '../../shared/Header'
import axios from 'axios'
import { API_URL } from '../../../../util/API'
import { useDispatch, useSelector } from 'react-redux';
import { cancelReq, sendReq, unFollowReq } from '../../../../redux/AllUserDataSlice'


const SocialSite = () => {

    let dispatch = useDispatch();
    let allData = useSelector(state => state.AllUserDataSlice?.allUser)
    let recList = useSelector(state => state.AllUserDataSlice?.senderData)
    let userData = useSelector(state => state.UserDataSlice)
    let followingList = useSelector(state => state.AllUserDataSlice?.followinglist)
    
    
    let onlyId = allData?.map(value => value._id);
    recList = recList?.filter(value => onlyId?.includes(value?.receiverid))
    recList = recList?.map(value => value.receiverid);


    let sendRequest = async(receiverId) =>{
        let obj = {
            receiverid : receiverId,
            senderid : userData._id
        }
        dispatch(sendReq(obj))
    }

    let cancelRequest = async(receiverId) =>{
        let obj = {
            receiverid : receiverId,
            senderid : userData._id
        }
        dispatch(cancelReq(obj))
    }

    let unFollowRequest = async(receiverId) =>{
        let obj = {
            receiverid : receiverId,
            senderid : userData._id
        }
        // console.log(obj)
        dispatch(unFollowReq(obj))
    }

  return (
    <>
        <Header />


        <div className='container my-5' style={{minHeight : "700px"}}>
            <div className='row'>
                <div className='col-md-10 offset-md-1'>
                    {
                        allData?.map((value)=>{
                            return(
                                <div className='card'>
                                    <div className='card-header'>
                                        <h4 style={{display : "inline"}}>{value.firstname + " " + value.lastname}</h4>
                                        {
                                            followingList && followingList.includes(value?._id) ?  <button className='btn btn-secondary'onClick={()=>unFollowRequest(value?._id)} style={{ display : "inline", float : "right" }}>Followed</button> :
                                            recList?.includes(value._id) ? <button className='btn btn-success'onClick={()=>cancelRequest(value._id)} style={{ display : "inline", float : "right" }}>Requested</button>  :
                                            <button className='btn btn-primary'onClick={()=>sendRequest(value._id)} style={{ display : "inline", float : "right" }}>Follow</button>
                                        }
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>

        
        <Footer />
    </>
  )
}

export default SocialSite