import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    html, body {
        width: 100%;
        height: 100%;
        padding: 0;
        margin: 0;
        border: 0;
        font-size: 100%;
        vertical-align: baseline;
        background: #312e38;
    }

    body, input, button {
        font-family: "Roboto Slab", serif;
        font-weight: 600;
        font-size: 18px;
        -webkit-font-smoothing: antialiased;
    }

    button {
        cursor: pointer;
    }

    svg {
        cursor: pointer;
    }

    h1, h2, h3, h4, h5 ,h6, strong {
        font-weight: 500;
    }

    #root {
        width: 100%;
        height: 100%;
    }
`;

export default GlobalStyle;