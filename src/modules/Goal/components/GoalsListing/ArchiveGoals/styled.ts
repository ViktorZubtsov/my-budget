// @ts-nocheck
import {applySpacing, SpacingProps} from '@salutejs/plasma-ui';
import styled from 'styled-components';

export const ArchiveGoalsStyled = styled.div<SpacingProps>`
    ${applySpacing}
`;

export const Wrap = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 8px;
`;

export const FetchingWrap = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
`;
