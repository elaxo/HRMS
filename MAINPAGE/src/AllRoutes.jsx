import React, { useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Auth, Dashboard } from './layouts'
import { useSelector } from 'react-redux'

const AllRoutes = () => {

  const [allow,setAllow] = useState(false)
  const userState = useSelector((state)=>state.userState)
  useEffect(()=>{

    if(userState.isLogged)
    setAllow(true)

  },[userState])

  return (
    <>
    <Routes>
      <Route path="/dashboard/*" element={allow?<Dashboard />:<Auth/>} />
      <Route path='/auth' element={<Auth/>} />
      <Route path="*" element={allow?<Navigate to="/dashboard/home" replace />:<Auth/>} />
    </Routes>
    </>
  )
}

export default AllRoutes