import {applySpacing, Card, SpacingProps} from '@salutejs/plasma-ui';
import styled from 'styled-components';

export const AccountsCardStyled = styled(Card)<SpacingProps>`
    ${applySpacing}
`;
export const Content = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 24px;
`;
