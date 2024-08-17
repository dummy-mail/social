import React, { useEffect, useState } from 'react'
import Footer from '../../shared/Footer'
import Header from '../../shared/Header'
import socket from '../../../../util/Socket';
import { useDispatch, useSelector } from 'react-redux';
import { cancelReq, handleAcceptReq, handleReceiveReq, handleRejectReq, sendReq, unFollowReq } from '../../../../redux/AllUserDataSlice'


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

    useEffect(()=>{
        // Listen for follow request event
        // socket.on('receiveFollowRequest', ({ senderId }) => {
        //     // Handle follow request notification (e.g., show a notification or update UI)
        //     dispatch(handleReceiveReq(senderId))
        // });

           // Listen for follow request accepted event
        socket.on('followRequestAccepted', ({ receiverId }) => {
          // Update the button text to "Followed"
            let obj = {
            senderid : userData?._id,
            receiverid : receiverId
            }
            dispatch(handleAcceptReq(obj));
        });

        socket.on('rejectRequestDone', ({ receiverId }) => {
            let obj = {
                senderid : userData?._id,
                receiverid : receiverId
                }
                dispatch(handleRejectReq(obj))
        })
  

        return () => {
            // Cleanup listeners on component unmount
            socket.off('receiveFollowRequest');
            socket.off('followRequestAccepted');
        };
    }, [])

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