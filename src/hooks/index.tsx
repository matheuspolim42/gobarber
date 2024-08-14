import React from "react";
import { AuthProvider } from "./auth";
import { ToastProvider } from "./toast";

export const HookExecuter: React.FC<{children: React.ReactNode}> = ({ children }) => {
    return (
        <AuthProvider>
            <ToastProvider>
                {children}
            </ToastProvider>
        </AuthProvider> 
    );
}