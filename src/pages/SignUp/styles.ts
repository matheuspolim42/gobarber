import styled, { keyframes } from "styled-components";
import background from "../../assets/1587470786293-attachment.png";

export const Background = styled.div`
    width: 65%;
    height: 100vh;
    background-image: url(${background});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
`;


export const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 100vh;
`;

const appearFromRight = keyframes`
    from {
        opacity: 0;
        transform: translateX(100px);
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

    animation: ${appearFromRight} 1s;
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 35%;

    .error {
        color: #e32636;
        margin-top: 5px;
        text-align: center;
        text-transform: uppercase;
        font-size: 13px;
    }

    form {
        color: #eee;
        max-width: 400px;

        button {
            width: 100%;
        }

        a {
            display: flex;
            justify-content: center;
            align-items: center;
            text-decoration: none;
            color: #bbb;
            font-size: 14px;
            margin-top: 50px;
        }
    }

    img {
        width: 230px;
        margin-bottom: 20px;
    }
`;