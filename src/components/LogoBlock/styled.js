import {colorValues} from '@salutejs/plasma-tokens';
// eslint-disable-next-line camelcase
import {Amatic_SC} from 'next/font/google';
import Link from 'next/link';
import styled from 'styled-components';

export const LogoWrap = styled(Link)`
    align-items: center;
    color: ${colorValues.white};
    display: flex;
    flex-direction: row;
    padding: 15px 0;
    text-decoration: none;
`;

export const LogoImg = styled.img`
    height: 74px;
    margin-left: 10px;
    width: 34px;
`;

export const LogoTitle = styled.span`
    font-size: 32px;
    padding: 10px 0;
`;

export const amatic = Amatic_SC({
    display: 'swap',
    subsets: ['latin'],
    weight: '400',
});
