import React from 'react'
import { useRoutes } from 'react-router-dom'
import Home from '../components/feature/Home'
import Teacher from '../components/feature/Teacher'

const AllRoutes = () => {

    let routes = useRoutes([
        {
            path : "/",
            element : <Home />
        },
        {
            path : "/teacher",
            element : <Teacher />
        },
    ])

  return ( routes )
}

export default AllRoutes