import React from 'react'
import { Link } from 'react-router-dom'
import { Space } from 'antd'
import { useAuthContext } from '@/hooks/AuthContext'

const Navbar = () => {
  const { isAuth, handleLogout } = useAuthContext()

  return (
    <header>
      {/* <div className="alert alert-danger alert-dismissible fade show mb-0 text-center" role="alert">
        <strong>Get up to 50% OFF on best-selling products today!</strong>
        <p className='mb-0'>Experience seamless online shopping with 100% genuine items, secure payment options, and 24/7 support at Valoria.</p>
        <button type="button" className="btn-close my-md-4 my-lg-2" data-bs-dismiss="alert" aria-label="Close"></button>
      </div> */}
      <nav className="custom-navbar navbar navbar-expand-lg">
        <div className="container-fluid px-3 px-lg-4">
          {/* Brand Logo */}
          <Link to="/" className="navbar-brand me-4">
            <strong className="fs-4 brand-text">Veloria Store</strong>
          </Link>

          {/* Toggler Button for Mobile */}
          <button
            className="navbar-toggler shadow-none border-0 bg-light"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navbar Links */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/" className="nav-link custom-link active">Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/products" className="nav-link custom-link">Products</Link>
              </li>
              <li className="nav-item">
                <Link to="" className="nav-link custom-link">Services</Link>
              </li>
              <li className="nav-item">
                <Link to="" className="nav-link custom-link">Contact</Link>
              </li>
            </ul>

            {/* Auth Action Buttons */}
            <div className="auth-buttons mt-3 mt-lg-0">
              {isAuth ? (
                <Space className="w-100 justify-content-start justify-content-lg-end">
                  <Link to="/dashboard/user-profile" className="btn btn-custom-outline">Dashboard</Link>
                  <button className="btn btn-custom-danger" onClick={handleLogout}>Logout</button>
                </Space>
              ) : (
                <Space className="w-100 justify-content-start justify-content-lg-end">
                  <Link to="/auth/login" className="btn btn-custom-ghost">Login</Link>
                  <Link to="/auth/register" className="btn btn-custom-primary">Register</Link>
                </Space>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Navbar