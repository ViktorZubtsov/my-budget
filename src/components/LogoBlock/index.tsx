import {memo} from 'react';

import {PROJECT_NAME} from '@/constant';

import {amatic, LogoImg, LogoTitle, LogoWrap} from './styled';

interface ILogoBlockProps {
    logoImg: string;
}

export const LogoBlock = memo<ILogoBlockProps>(({logoImg}) => {
    return (
        <LogoWrap href="/">
            <LogoTitle className={amatic.className}>{PROJECT_NAME}</LogoTitle>
            <LogoImg src={logoImg} alt="logo" />
        </LogoWrap>
    );
});
