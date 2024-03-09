// @ts-nocheck
import {applySpacing, SpacingProps} from '@salutejs/plasma-ui';
import styled from 'styled-components';

export const GoalItemStyled = styled.div<SpacingProps>`
    align-items: center;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    background-color: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border-radius: 15px;
    ${applySpacing}
`;

export const GoalItemWrap = styled.div<SpacingProps>`
    ${applySpacing}
`;
