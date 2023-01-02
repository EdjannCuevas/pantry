import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getUid } from "./userTokenManager";

const ProtectedRoutes = () => {
    const user = getUid();
    console.log(user)

    return (
        user.length > 0 ? <Outlet/> : <Navigate to='/'/>
    );
}

export default ProtectedRoutes;