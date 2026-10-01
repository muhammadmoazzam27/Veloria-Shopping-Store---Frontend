import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/sidebar";
import Header from "../Dashboard-Header";
import Footer from "../Dashboard-Footer";
import axios from "axios";

const UserDashboard = () => {

  const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL

  const [showSidebar, setShowSidebar] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [loading, setLoading] = useState(true);

  const getUser = () => {
    const token = localStorage.getItem("jwtToken");

    axios.get(`${VITE_API_BASE_URL}/auth/get/user/single`, { headers: { Authorization: `Bearer ${token}` } })

      .then((res) => {
        const { status, data } = res;
        if (status === 200) {
          setUserRole(data.Role);
        }
      })
      .catch((error) => {
        console.error("Error : ", error);
      })
      .finally(() => {
        setLoading(false);
      })
  };

  useEffect(() => {
    getUser();
  }, []);

  if (loading) {
    <div>
      <h1 className="d-flex justify-content-center align-items-center fs-2 ">Loading Dashboard...</h1>
    </div >
    return
  }

  return (
    <div className="dashboard-layout">
      <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} userRole={userRole} />

      <div className="main-content">
        <Header setShowSidebar={setShowSidebar} />

        <main className="content">
          <Outlet context={{ userRole }} />
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default UserDashboard;