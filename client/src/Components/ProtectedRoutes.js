import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ authUser, children }) => {

    return (
        authUser ? children : <Navigate to='/' replace />
    );
}

export default ProtectedRoutes;