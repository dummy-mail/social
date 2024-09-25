import React from 'react'
import Home from '../../components/user/feature/Home'
import UserLogin from '../../components/user/feature/UserLogin'
import UserSignup from '../../components/user/feature/UserSignup'
import Shop from '../../components/user/feature/Shop'
import About from '../../components/user/feature/About'
import AdminLogin from '../../components/admin/feature/AdminLogin'
import RecoverAccount from '../../components/user/feature/RecoverAccount'

const Root = [
  {
    path : '/',
    element : <Home />
  },
  {
    path : '/userlogin',
    element : <UserLogin />
  },
  {
    path : '/usersignup',
    element : <UserSignup />
  },
  {
    path : '/shop',
    element : <Shop />
  },
  {
    path : '/about',
    element : <About />
  },
  {
    path : '/adminlogin',
    element : <AdminLogin />
  },
  {
    path : '/recoveraccount',
    element : <RecoverAccount />
  },
  
]

export default Root