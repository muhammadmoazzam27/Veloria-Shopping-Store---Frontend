import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import UserDashboard from './User-Dashboard/userDashboard'
import Products from './Products'
import Orders from './Orders'
import AllUsers from './Users'
import HomeOverview from './Home-Overview'
import axios from 'axios'


const Dashboard = () => {

  const getRole = () => {

    let role = "";
    const token = localStorage.getItem("jwtToken")
    axios.get("http://localhost:8000/api/auth/get/user/single", { headers: { Authorization: `Bearer ${token}` } })

      .then((res) => {
        const { status, data } = res;
        if (status === 200) {
          role = data.Role
          console.log("Dashboard Route Check : ", role)
        }
      })
      .catch((error) => {
        console.error("Error : ", error)
      })

  }

  useEffect(() => {
    getRole();
  }, [])


  return (
    <Routes>
      <Route path="/user-profile" element={<UserDashboard />}>
        <Route index element={<HomeOverview />} />
        <Route path="products" element={<Products />} />
        <Route path="orders" element={<Orders />} />
        <Route path="all/users" element={<AllUsers />} />
      </Route>
    </Routes>
  )
}

export default Dashboard;


// <Route path="/user-profile" element={<UserDashboard />}>
//       <Route index element={(role === "Super Admin" || role === "Admin") ? (<HomeOverview />) : <Navigate to="/dashboard/user-profile" />} />
//       <Route path="products" element={(role === "Super Admin" || role === "Admin") ? (<Products />) : <Navigate to="/dashboard/user-profile" />} />
//       <Route path="orders" element={(role === "Super Admin" || role === "Admin" || role === "Customer") ? (<Orders />) : <Navigate to="/dashboard/user-profile" />} />
//       <Route path="all/users" element={(role === "Super Admin") ? (<AllUsers />) : <Navigate to="/dashboard/user-profile" />} />
//     </Route>
