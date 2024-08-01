import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import api from '../services/api';

interface User {
    id: string;
    name: string;
    email: string;
}

interface SignInProps {
    email: string;
    password: string;
};

interface DataPropsSession {
    user: User | null;
    token: string;
}

interface AuthContextData {
    user?: User | null;
    signIn(signInProps?: SignInProps): Promise<void>;
    signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [data, setData] = useState<DataPropsSession | null>(() => {
        const user = localStorage.getItem("@GoBarberUser");
        const token = localStorage.getItem("@GoBarberToken");
    
        if (token && user) {
            try {
                return { token, user: JSON.parse(user) };
            } catch (error) {
                console.error("Erro ao analisar JSON do usuário:", error);
            }
        }
    
        return null
    });
    
    const signIn = useCallback(async (signInProps?: SignInProps): Promise<void> => {
        try {
            const response = await api.post('sessions', {
                email: signInProps?.email,
                password: signInProps?.password,
            });

            const { user, token } = response.data;

            localStorage.setItem("@GoBarberUser", JSON.stringify(user));
            localStorage.setItem("@GoBarberToken", token);

            setData({ user, token });
        } catch (error) {
            console.error("Erro ao fazer login:", error);
        }
    }, []);

    const signOut = useCallback(() => {
        localStorage.removeItem("@GoBarberToken");
        localStorage.removeItem("@GoBarberUser");
                
        setData(null); // Limpe os dados ao sair
    }, []);

    return (
        <AuthContext.Provider value={{ user: data ? data.user : null, signIn, signOut }}>
            { children }
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
        
    if (!context) {
        throw new Error('useAuth deve ser usado dentro de um AuthProvider');
    }
        
    return context;
}