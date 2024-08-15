import React from 'react'
import { Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { clearAllUserData } from '../../../redux/AllUserDataSlice'
import { clearUserData } from '../../../redux/UserDataSlice'

const Logout = () => {
    localStorage.clear();
    let dispatch = useDispatch();
    dispatch(clearAllUserData())
    dispatch(clearUserData())
  return (
    <>
    <Navigate to="/userlogin" />
    </>
  )
}

export default Logout