// @ts-nocheck
import {IconChevronLeft} from '@salutejs/plasma-icons';
import {IconProps} from '@salutejs/plasma-icons/IconRoot';
import styled from 'styled-components';

export const PageHeaderStyled = styled.div`
    align-items: center;
    column-gap: 16px;
    display: grid;
    grid-template-columns: auto 1fr;
    padding: 6px 0;
`;

export const PageHeaderIcon = styled(IconChevronLeft)<IconProps>`
    cursor: pointer;
`;
