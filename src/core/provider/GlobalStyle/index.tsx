'use client';
import {background, gradient, text} from '@salutejs/plasma-tokens';
import {createGlobalStyle} from 'styled-components';
const DocumentStyle = createGlobalStyle`
    html {
        color: ${text};
        background-color: ${background};
        background-image: ${gradient};
    }
`;

export const GlobalStyle = () => <DocumentStyle />;

export default GlobalStyle;
