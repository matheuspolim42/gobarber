import styled, { keyframes } from "styled-components";
import signIn from "../../assets/sign-in-background.png"
import { FiLogIn } from "react-icons/fi";

export const Container = styled.div`
    display: flex;
    position: relative;
    height: 100%;
`;

export const Icon = styled(FiLogIn)`
    margin-right: 12px;
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
`;

const appearFromLeft = keyframes`
    from {
        opacity: 0;
        transform: translateX(-100px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
`;

export const AnimationContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    animation: ${appearFromLeft} 1s;

    form {
        display: flex;
        flex-direction: column;
        text-align: center;
        width: 400px;

        img {
            width: 30%;
            margin-bottom: 50px;
        }

        h1 {
            color: #eee;
        }

        a {
            margin-top: 30px;
            display: flex;
            flex-direction: column;
            color: #eee;
            font-size: 14px;
            text-decoration: none;
        }
    }

    a {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 75px;
        color: #FF9000;
        font-size: 14px;
        text-decoration: none;
    }
`;

export const Background = styled.div`
    background-image: url(${signIn});
    width: 125%;
    height: 100%;
    background-repeat: no-repeat;
    background-size: cover;
`;