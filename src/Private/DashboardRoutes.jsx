import React from 'react';
import { Navigate, Outlet, useOutletContext } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles }) => {
    const context = useOutletContext();
    const userRole = context?.userRole;

    if (!allowedRoles.includes(userRole)) {
        return <Navigate to="/dashboard/user-profile/orders" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;