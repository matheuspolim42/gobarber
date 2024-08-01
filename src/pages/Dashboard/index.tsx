import React, { useEffect } from "react";
import { useAuth } from "../../hooks/auth";
import { useLocation } from "react-router";
import { useNavigate } from "react-router";

const Dashboard: React.FC = () => { 
    const { signOut } = useAuth();

    return (
        <button onClick={() => signOut()}>Sign Out</button>
    );
}

export default Dashboard;