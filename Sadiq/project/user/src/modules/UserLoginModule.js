import React, { useEffect } from 'react'
import {Outlet, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { getLoginUserData } from '../redux/UserDataSlice';
import { getAllUserData } from '../redux/AllUserDataSlice';
import socket from '../util/Socket';


const UserLoginModule = () => {
  let navigate = useNavigate();
  let dispatch = useDispatch();
  useEffect(()=>{
      if(! localStorage.getItem("Token"))
      {
          navigate("/userlogin");
      }
  },[])

  
  let ID = localStorage.getItem("Token");
  useEffect(()=>{
    dispatch(getAllUserData(ID))
    dispatch(getLoginUserData(ID))
  }, [])
  
  useEffect(()=>{
    socket.emit('updateDatabase', { userId : ID })
  }, [])
  
  return (
    <>     
      
        <Outlet />
      
    </>
  )
}

export default UserLoginModule