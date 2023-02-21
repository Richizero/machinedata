import React from 'react'
import { Navigate } from "react-router-dom"

const ProtectedRoutes = ({ user, children }) => {
    // let navigate = useNavigate()
    console.log(user)
    if (!user) {
        return <Navigate to={'/'} />
    }
    return children
}

export default ProtectedRoutes