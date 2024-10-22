import React, { useEffect } from 'react'
import Header from '../components/Header'
import { Outlet } from 'react-router-dom'

const DashBoard = ({userAuthenticated}) => { 
  return (
    <>
    <Header userAuthenticated={userAuthenticated}/>
    <Outlet/>
    </>
  )
}

export default DashBoard