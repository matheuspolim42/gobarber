import React, { useContext, createContext, useState, useCallback } from "react";
import ToastContainer from "../components/ToastContainer";
import { v4 as uuidv4 } from 'uuid';

interface ToastMessage {
    id: string;
    type?: 'error' | 'info' | 'success';
    title: string;
    description?: string;
}

interface ToastContextData {
    createToast(message: Omit<ToastMessage, 'id'>): void;
    removeToast(id: string): void;
}

const ToastContext = createContext<ToastContextData>({} as ToastContextData);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [messages, setMessages] = useState<ToastMessage[]>([]);

    const createToast = useCallback(({ type, title, description }: Omit<ToastMessage, 'id'>) => {
        const id = uuidv4();
        const toast: ToastMessage = { id, type, title, description };
        setMessages((state) => [...state, toast]);
    }, []);

    const removeToast = useCallback((id: string) => {
        setMessages((state) => state.filter(message => message.id !== id));
    }, []);

    return (
        <ToastContext.Provider value={{ createToast, removeToast }}>
            {children}
            <ToastContainer messages={messages} />
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);

    if (context === undefined) {
        throw new Error("useToast must be used within a ToastProvider");
    }

    return context;
};
