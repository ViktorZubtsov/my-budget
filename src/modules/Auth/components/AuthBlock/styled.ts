import {Card, CardProps} from '@salutejs/plasma-ui';
import {applySpacing, SpacingProps} from '@salutejs/plasma-ui';
import styled from 'styled-components';

export const AuthBlockCard = styled(Card)<SpacingProps & CardProps>`
    align-items: center;
    flex-direction: column;
    justify-content: center;
    display: flex;
    width: 100%;
    row-gap: 24px;
    ${applySpacing}
`;

export const AuthBlockStyled = styled.div<SpacingProps>`
    overflow: hidden;
    ${applySpacing}
`;
