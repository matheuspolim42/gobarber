import React from "react";
import { Container } from "./styles";
import Toast from './Toast';
import { useTransition, animated } from '@react-spring/web';

interface ToastMessage {
    id: string;
    type?: 'error' | 'info' | 'success';
    title: string;
    description?: string;
}

interface ToastMessages {
    messages: ToastMessage[];
}

const ToastContainer: React.FC<ToastMessages> = ({ messages }) => {
    // Utilize o useTransition para animar a entrada e saída dos Toasts
    const messageWithTransition = useTransition(messages, {
        keys: (message) => message.id,
        from: { right: '120%', opacity: 0 },
        enter: { right: '0%', opacity: 1 },
        leave: { right: '120%', opacity: 0 },
    });

    return (
        <Container>
            {messageWithTransition((style, item) => (
                <animated.div key={item.id} style={style}>
                    <Toast message={item} />
                </animated.div>
            ))}
        </Container>
    );
};

export default ToastContainer;
