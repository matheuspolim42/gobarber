import styled, {css} from "styled-components";

interface DynamicToast {
    type?: 'success' | 'error' | 'info';
}

const toastTypeVariations = {
    error: css`
        background: #fddede;
        color: #c53030;
    `,
    info: css`
        background: #ebf8ff;
        color: #3172b7;
    `,
    success: css`
        background: #e6fffa;
        color: #2e656a;
    `
}

export const Container = styled.div<DynamicToast>`
    width: 360px;

    position: relative;
    padding: 16px 30px 16px 16px;
    border-radius: 10px;
    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.6);

    display: flex;

    background: #ebf8ff;
    color: #3172b7;

    ${(props) => toastTypeVariations[props.type || 'info']}

    > svg {
        margin: 4px 12px 0 0;
        cursor: default;
    }

    div {
        flex: 1;

        p {
            line-height: 20px;
            font-size: 14px;
            margin-top: 8px;
            opacity: 0.75;
        }
    }

    button {
        border: 0;
        outline: none;
        background: inherit;
        
        position: absolute;
        top: 18px;
        right: 15px;
    }

    
    margin-bottom: 20px;
`;