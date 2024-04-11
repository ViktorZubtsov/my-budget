import {Container} from '@salutejs/plasma-ui';
import {useRouter} from 'next/navigation';
import {memo, useContext} from 'react';

import {LogoBlock} from '@/components/LogoBlock';
import Menu from '@/components/Menu';
import {ProcessLoaderContext} from '@/context';
import {AuthContext} from '@/modules/Auth/context';

import {HeaderSpinner, HeaderStyled, LeftContainer} from './styled';

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
