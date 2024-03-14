'use client';
import styled from 'styled-components';

const LoaderWrap = styled.div`
    align-items: center;
    backdrop-filter: blur(6px);
    background-color: rgb(0 0 0 / 34%);
    display: flex;
    height: 100%;
    justify-content: center;
    left: 0;
    position: absolute;
    width: 100%;
    z-index: 1000;
`;

export const Loader = styled.div`
    animation: spin 0.5s linear infinite;
    border: 2px solid #f3f3f3;
    border-radius: 50%;
    border-top: 2px solid #24b23e;
    height: 62px;
    width: 62px;
`;

export default function Loading() {
    return (
        <LoaderWrap>
            <Loader />
        </LoaderWrap>
    );
}
