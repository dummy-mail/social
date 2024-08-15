import React, { useEffect, useState } from 'react'
import Header from '../../shared/Header'
import Footer from '../../shared/Footer'
import { useDispatch, useSelector } from 'react-redux'
import { cancelReq } from '../../../../redux/AllUserDataSlice'

const FriendReq = () => {

  let dispatch = useDispatch();
  let allData = useSelector(state => state.AllUserDataSlice?.allUser)
  let senderData = useSelector(state => state.AllUserDataSlice?.senderData)
  let receiverData = useSelector(state => state.AllUserDataSlice?.receiverData)
  let userData = useSelector(state => state.UserDataSlice)
    
    
  let onlyId = allData?.map(value => value._id);
  
  let checkIfPresentrec = senderData?.filter(value => onlyId?.includes(value?.receiverid))
  checkIfPresentrec = senderData?.map(value => value?.receiverid)
  let sendRequests = [];
  if(checkIfPresentrec.length != 0){
    sendRequests = allData.filter(value => checkIfPresentrec.includes(value?._id))
  }

let cancelRequest = async(receiverId) =>{
    let obj = {
        receiverid : receiverId,
        senderid : userData?._id
    }
    dispatch(cancelReq(obj))
}

let rejectRequest = async(receiverId) =>{
    let obj = {
        receiverid : receiverId,
        senderid : userData?._id
    }
    dispatch(cancelReq(obj))
}

  let checkIfPresentSend = receiverData?.filter(value => onlyId?.includes(value?.senderid))
  checkIfPresentSend = receiverData?.map(value => value?.senderid)
  let recRequests = []
  if(checkIfPresentSend.length != 0){
    recRequests = allData?.filter(value => checkIfPresentSend.includes(value?._id))
  }

  return (
    <>
        <Header />
        <div className='container my-3' style={{ minHeight : "700px" }}>
          <div className='row'>
            {/* <button className='btn btn-info' onClick={()=>{console.log(sendReq)}}> ok</button> */}
            <div className='col-md-6 text-center'>
              <h4 style={{fontWeight : "bold", color : "GrayText"}}>Received</h4>
              <div className='card'>
                <div className='card-body'>
                  <table className='table table-hover table-primary table-striped'>
                    <tbody>
                      {
                        recRequests?.length != 0 ? recRequests?.map((value)=>{
                          return(
                            <tr>
                              <td>{`${value?.firstname} ${value?.lastname}`}</td>
                              <td><button className='btn btn-danger' onClick={rejectRequest(value?._id)}>Reject</button></td>
                            </tr>
                          )
                        }) :
                        <tr>
                          <th>No Request Received</th>
                        </tr>
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className='col-md-6 text-center'>
              <h4 style={{fontWeight : "bold", color : "GrayText"}}>Send</h4>
              <div className='card'>
                <div className='card-body'>
                  <table className='table table-hover table-info table-striped'>
                  <tbody>
                      {
                        sendRequests?.length != 0 ? sendRequests?.map((value)=>{
                          return(
                            <tr>
                              <td>{`${value?.firstname} ${value?.lastname}`}</td>
                              <td>
                                {
                                  checkIfPresentrec?.includes(value._id) ? <button className='btn btn-success'onClick={()=>cancelRequest(value._id)} style={{ display : "inline", float : "right" }}>Requested</button>  : null
                                }
                              </td>
                            </tr>
                          )
                        }) :
                        <tr>
                          <th>No Request Received</th>
                        </tr>
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
    </>
  )
}

export default FriendReq