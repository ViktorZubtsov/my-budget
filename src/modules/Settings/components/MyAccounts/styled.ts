import {warning} from '@salutejs/plasma-core';
import {TextM} from '@salutejs/plasma-ui';
import styled from 'styled-components';

export const MyAccountsStyled = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 15px;
    width: 100%;
`;

export const Header = styled.div`
    display: flex;
    justify-content: space-between;
`;

export const EmptyText = styled(TextM)`
    color: ${warning};
`;
