import {Container} from '@salutejs/plasma-ui';
import {useRouter} from 'next/router';
import {memo, useContext} from 'react';

import {HeaderSpinner, HeaderStyled, LeftContainer} from './styled';
import {LogoBlock} from '../LogoBlock';
import Menu from '../Menu';
import {ProcessLoaderContext} from '../../context';
import {AuthContext} from '../../modules/Auth/context';

interface IHeaderProps {
    logoImg: string;
}

export const Header = memo<IHeaderProps>(({logoImg}) => {
    const {session} = useContext(AuthContext);
    const isLoader = useContext(ProcessLoaderContext);
    const {userAvatar, userName} = useContext(AuthContext);
    const {push} = useRouter();

    return (
        <Container>
            <HeaderStyled>
                <LogoBlock logoImg={logoImg} />
                <LeftContainer>
                    {(isLoader || 'loading' === session) && <HeaderSpinner size={32} />}
                    {'authenticated' === session && <Menu userName={userName} userAvatar={userAvatar} onClickSettings={() => push('/settings')} />}
                </LeftContainer>
            </HeaderStyled>
        </Container>
    );
});
