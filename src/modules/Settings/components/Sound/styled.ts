import {applySpacing, Card, H3, SpacingProps, Switch} from '@salutejs/plasma-ui';
import styled from 'styled-components';

export const CardStyled = styled(Card)<SpacingProps>`
    ${applySpacing}
`;
export const Content = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 24px;
`;

export const Title = styled(H3)`
    align-items: center;
    column-gap: 15px;
    display: flex;
`;
