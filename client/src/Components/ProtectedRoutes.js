import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getUid } from "./userTokenManager";

const ProtectedRoutes = ({children}) => {
    const user = getUid();
    console.log(user)

    return (
        user.length > 0 ? children : <Navigate to='/' replace />
    );
}

export default ProtectedRoutes;