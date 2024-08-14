import React from "react";
import { Routes, Route } from "react-router-dom";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Dashboard from "../pages/Dashboard";
import PrivateRoute from "./PrivateRoute";

const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<PrivateRoute element={<SignIn />} isPrivate={false} />} />
            <Route path="/signup" element={<PrivateRoute element={<SignUp />} isPrivate={false} />} />
            <Route path="*" element={<PrivateRoute element={<SignIn />} isPrivate={false} />} />
            <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} isPrivate={true} />} />
        </Routes>
    );
};


export default AppRoutes;
