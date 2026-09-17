import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Typography } from "antd";

import Sidebar from "../Sidebar/sidebar";
import Header from "../Dashboard-Header";
import Footer from "../Dashboard-Footer";
import axios from "axios";

const { Text } = Typography;

const UserDashboard = () => {

  const [showSidebar, setShowSidebar] = useState(false);
  const [userRole, setUserRole] = useState("")

  const getUser = () => {

    const token = localStorage.getItem("jwtToken");

    axios.get("http://localhost:8000/api/auth/get/user/single", { headers: { Authorization: `Bearer ${token}` } })

      .then((res) => {
        const { status, data } = res
        if (status === 200) {
          setUserRole(data.Role)
          console.log("User Dashboard Role : ", data.Role)
        }
      })
      .catch((error) => {
        console.error("Error : ", error)
      })

  }

  useEffect(() => {
    getUser();
  }, [])

  return (
    <div className="dashboard-layout">
      <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} userRole={userRole} />

      <div className="main-content">
        <Header setShowSidebar={setShowSidebar} />

        <main className="content">
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default UserDashboard;