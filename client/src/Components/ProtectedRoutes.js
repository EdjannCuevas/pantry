import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserAuth } from "./auth/AuthContext";

const ProtectedRoutes = () => {
    const user = UserAuth();

    return (
        user ? <Outlet/> : <Navigate to='/'/>
    );
}

export default ProtectedRoutes;