import { useAuthContext } from '@/hooks/AuthContext'
import React from 'react'

const DashboardProtectedRoutes = ({ Component }) => {
    const { user } = useAuthContext();
    const role = user.role;

    return (
        <>
            <Component />
        </>
    )
}

export default DashboardProtectedRoutes