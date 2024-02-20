import {memo, useContext, useMemo} from 'react';
import ReactAvatar from 'react-avatar';

import {AuthContext} from '../../modules/Auth/context';

export interface IAvatar {
    userAvatar: string;
    userName: string;
}

export const Avatar = memo<IAvatar>(({userAvatar, userName}) => {
    return <ReactAvatar size="40px" round name={userName ?? 'User Name'} src={userAvatar} />;
});
