import {Card, CardProps, H3} from '@salutejs/plasma-ui';
import {applySpacing, SpacingProps} from '@salutejs/plasma-ui';
import styled from 'styled-components';

export const ThemeSettingStyled = styled(Card)<SpacingProps & CardProps>`
    ${applySpacing}
`;

export const ThemeSettingContent = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 24px;
`;

export const ThemeSettingTitle = styled(H3)<SpacingProps>`
    display: flex;
    column-gap: 15px;
    align-items: center;
    ${applySpacing}
`;