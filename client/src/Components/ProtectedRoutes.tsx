import React from "react";
import { Navigate } from "react-router-dom";
import { User } from "../globals";

interface ProtectedRoutesProps {
    authUser: User | null;
    children: any;
}

const ProtectedRoutes: React.FC<ProtectedRoutesProps> = ({ authUser, children }) => {

    return (
        authUser ? children : <Navigate to='/login' replace />
    );
}

export default ProtectedRoutes;