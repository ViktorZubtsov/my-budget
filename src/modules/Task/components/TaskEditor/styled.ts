// @ts-nocheck
import {applySpacing, SpacingProps} from '@salutejs/plasma-ui';
import styled from 'styled-components';

export const TaskEditorFooter = styled.div<SpacingProps>`
    column-gap: 20px;
    display: flex;
    justify-content: flex-end;
    ${applySpacing}
`;
export const TaskEditorContent = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 25px;
`;

export const TaskEditorForm = styled.form`
    display: flex;
    flex-direction: column;
    row-gap: 25px;
`;
