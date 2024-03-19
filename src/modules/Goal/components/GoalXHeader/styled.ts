// @ts-nocheck
import {IconChevronLeft} from '@salutejs/plasma-icons';
import {TextM} from '@salutejs/plasma-ui';
import styled from 'styled-components';
export const GoalXHeaderStyled = styled.div`
    align-items: center;
    column-gap: 16px;
    display: grid;
    grid-template-columns: auto 1fr;
    padding: 6px 0;
`;

export const GoalXHeaderContent = styled.div`
    display: block;
    flex-direction: column;
    row-gap: 15px;
`;

export const Subtitle = styled(TextM)`
    color: rgb(255 255 255 / 56%);
`;
export const GoalXHeaderIcon = styled(IconChevronLeft)`
    cursor: pointer;
`;
