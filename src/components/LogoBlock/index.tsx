import {memo} from 'react';

import {amatic, LogoImg, LogoTitle, LogoWrap} from './styled';
import {PROJECT_NAME} from '../../constant';

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
