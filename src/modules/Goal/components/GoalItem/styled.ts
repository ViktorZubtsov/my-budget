// @ts-nocheck
import {applySpacing, SpacingProps} from '@salutejs/plasma-ui';
import styled from 'styled-components';

export const GoalItemStyled = styled.div<SpacingProps>`
    align-items: center;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0 10px;
    width: 100%;
    ${applySpacing}
`;

export const GoalItemWrap = styled.div<SpacingProps>``;
