// @ts-nocheck
import styled from 'styled-components';

export const AddButtonStyled = styled.div<{$isFixed: boolean}>`
    ${(props) => {
        if (props.$isFixed) {
            return `
                      bottom: 24px;
                      position: fixed;
                      right: 50%;
                      transform: translateX(28px);
                    `;
        }
        return '';
    }}
`;
