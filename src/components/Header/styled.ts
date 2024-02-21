import {Spinner, SpinnerProps} from '@salutejs/plasma-web';
import styled from 'styled-components';

export const HeaderStyled = styled.header`
    align-items: center;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

export const HeaderSpinner = styled(Spinner)<SpinnerProps>`
    z-index: 999;
`;

export const LeftContainer = styled.div`
    align-items: center;
    column-gap: 20px;
    display: flex;
`;
