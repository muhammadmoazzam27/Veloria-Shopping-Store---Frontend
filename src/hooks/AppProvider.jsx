import React from 'react'
import AuthContext from './AuthContext'

const AppProvider = ({ children }) => {
    return (
        <AuthContext>
            {children}
        </AuthContext>
    )
}

export default AppProvider