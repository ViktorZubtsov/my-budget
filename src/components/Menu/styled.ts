// @ts-nocheck
import {applySpacing, Body1, Button, H2, Sheet, SpacingProps, TextM} from '@salutejs/plasma-ui';
import {ButtonProps} from '@salutejs/plasma-web';
import styled from 'styled-components';

export const MenuStyled = styled.div<SpacingProps>`
    align-items: center;
    border: 1px solid var(--toastify-spinner-color);
    border-radius: 40px;
    column-gap: 20px;
    cursor: pointer;
    display: flex;
    ${applySpacing}
`;

export const MenuContent = styled(Body1)`
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    max-width: 856px;
    row-gap: 10px;
`;

export const MenuTitle = styled(H2)<SpacingProps>`
    text-align: center;
    ${applySpacing}
`;
export const MenuButton = styled(Button)<ButtonProps>`
    width: 100%;
`;
