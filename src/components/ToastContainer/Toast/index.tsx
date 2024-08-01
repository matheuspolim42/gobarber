import React, { useEffect } from "react";
import { FiAlertCircle, FiCheckCircle, FiInfo, FiXCircle } from 'react-icons/fi'
import { useToast } from "../../../hooks/toast";
import { Container } from "./styles";
import { rem } from "polished";

interface ToastMessage {
    id: string;
    type?: 'error' | 'info' | 'success';
    title: string;
    description?: string;
};

interface ToastMessages {
    message: ToastMessage;
};

const icons = {
    info: <FiInfo size={24} />,
    error: <FiAlertCircle size={24} />,
    success: <FiCheckCircle size={24} />
}

const Toast: React.FC<ToastMessages> = ({ message }) => {
    const { removeToast } = useToast();

    useEffect(() => {
        const timer = setTimeout(() => {
            removeToast(message.id);
        }, 3000);

        return () => {
            clearTimeout(timer);
        }
    }, [message.id])

    return (
        <Container type={message.type}>
            {icons[message.type || 'info']}

            <div>
                <strong>{message.title}</strong>
                {message.description && <p>{message.description}</p>}
            </div>

            <button onClick={() => removeToast(message.id)}>
                <FiXCircle size={18} />
            </button>
        </Container>
    )
};

export default Toast;