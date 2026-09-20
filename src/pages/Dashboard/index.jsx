import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import UserDashboard from './User-Dashboard/userDashboard';
import Products from './Products';
import Orders from './Orders';
import AllUsers from './Users';
import HomeOverview from './Home-Overview';
import ProtectedRoute from '@/Private/DashboardRoutes';

const Dashboard = () => {
  return (
    <Routes>
      <Route path="/user-profile" element={<UserDashboard />}>

        <Route element={<ProtectedRoute allowedRoles={["Customer", "Admin", "Super Admin"]} />}>
          <Route index element={<Orders />} />
          <Route path='orders' element={<Orders />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["Admin", "Super Admin"]} />}>
          <Route path="overview" element={<HomeOverview />} />
          <Route path="products" element={<Products />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["Super Admin"]} />}>
          <Route path="all/users" element={<AllUsers />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};

export default Dashboard;