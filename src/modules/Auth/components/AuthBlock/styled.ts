// @ts-nocheck
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

export const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;
    max-width: 400px;
`;

export const ToggleButton = styled.button`
    background: none;
    border: none;
    color: #007bff;
    cursor: pointer;
    font-size: 14px;
    margin-top: 16px;
    text-decoration: underline;

    &:hover {
        color: #0056b3;
    }
`;
