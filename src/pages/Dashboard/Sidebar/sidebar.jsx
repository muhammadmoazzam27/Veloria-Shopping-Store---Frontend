import { Link } from "react-router-dom";
import { LogoutOutlined } from "@ant-design/icons";

const Sidebar = ({ showSidebar, setShowSidebar, userRole }) => {

    return (
        <>
            <div className={`sidebar-overlay ${showSidebar ? "show" : ""}`} onClick={() => setShowSidebar(false)}></div>

            <aside className={`sidebar ${showSidebar ? "show" : ""}`}>
                <button className="close-btn d-md-none" onClick={() => setShowSidebar(false)}>✕</button>
                <h3 className="logo">Veloria Store</h3>

                <ul>
                    <li>
                        <Link to="/" onClick={() => setShowSidebar(false)}>Home</Link>
                    </li>

                    {
                        (userRole === "Super Admin" || userRole === "Admin") && (
                            <>
                                <li>
                                    <Link to="/dashboard/user-profile" onClick={() => setShowSidebar(false)}>Dashboard Overview</Link>
                                </li>

                                <li>
                                    <Link to="/dashboard/user-profile/products" onClick={() => setShowSidebar(false)}>Products</Link>
                                </li>
                            </>
                        )
                    }


                    {
                        (userRole === "Super Admin" || userRole === "Admin" || userRole === "Customer") && (
                            <li>
                                <Link to="/dashboard/user-profile/orders" onClick={() => setShowSidebar(false)}>Orders</Link>
                            </li>
                        )
                    }

                    {
                        (userRole === "Super Admin") && (
                            <li>
                                <Link to="/dashboard/user-profile/all/users" onClick={() => setShowSidebar(false)}>All Users</Link>
                            </li>
                        )
                    }

                    <li className="dropdown">
                        <a href="#" className="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" >Settings</a>
                        <ul className="dropdown-menu">
                            <li>
                                <Link className="dropdown-item">Change Password</Link>
                            </li>
                            <li>
                                <Link className="dropdown-item text-danger"> <LogoutOutlined /> <span className="me-auto px-2">Logout</span></Link>
                            </li>
                        </ul>
                    </li>
                </ul>
            </aside>
        </>
    )
}

export default Sidebar;