import {IconLogout, IconMenu, IconSettings} from '@salutejs/plasma-icons';
import {Sheet, TextM} from '@salutejs/plasma-ui';
import {signOut} from 'next-auth/react';
import {memo, useState} from 'react';

import {useFetch} from '../../hooks';
import {Avatar, IAvatar} from '../Avatar';
import {MENU_TITLE} from './constants';
import {MenuButton, MenuContent, MenuStyled, MenuTitle} from './styled';

interface IMenuProps {
    userAvatar: IAvatar['userAvatar'];
    userName: IAvatar['userName'];
    onClickSettings: () => void;
}

const Menu = memo<IMenuProps>(({onClickSettings, userAvatar, userName}) => {
    const [isShow, setIsShow] = useState<boolean>(false);
    const {isFetching, setIsFetching} = useFetch();

    const handleClick = () => {
        return setIsShow(!isShow);
    };

    const onLogout = () => {
        setIsFetching(true);
        signOut().then(() => {
            setIsFetching(true);
            handleClick();
        });
    };
    const handleClickSettings = () => {
        onClickSettings?.();
        return handleClick();
    };

    return (
        <>
            <MenuStyled pt="2x" pr="4x" pl="4x" pb="2x" onClick={handleClick}>
                <Avatar userAvatar={userAvatar} userName={userName} />
                <IconMenu />
            </MenuStyled>
            <Sheet isOpen={isShow} onClose={handleClick}>
                <MenuContent>
                    <MenuTitle pb="10x">{MENU_TITLE}</MenuTitle>
                    <MenuButton onClick={handleClickSettings}>
                        <IconSettings />
                        <TextM>Настройки</TextM>
                    </MenuButton>
                    <MenuButton isLoading={isFetching} onClick={onLogout}>
                        <IconLogout />
                        <TextM>Выход</TextM>
                    </MenuButton>
                </MenuContent>
            </Sheet>
        </>
    );
});

export default Menu;
