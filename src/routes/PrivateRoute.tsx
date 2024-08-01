import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/auth';

interface PrivateRouteProps {
    element: React.ReactElement;
    isPrivate: boolean; // Indica se a rota é privada
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element, isPrivate }) => {
    const { user } = useAuth();

    const isAuthenticated = user !== undefined && user !== null;

    if (isPrivate && !isAuthenticated) {
        // Se a rota é privada e o usuário não está autenticado, redireciona para a página de login
        return <Navigate to="/" />;
    }

    if (!isPrivate && isAuthenticated) {
        // Se a rota não é privada e o usuário está autenticado, redireciona para o dashboard
        return <Navigate to="/dashboard" />;
    }

    // Renderiza o elemento se as condições de autenticação estiverem corretas
    return element;
};

export default PrivateRoute;
