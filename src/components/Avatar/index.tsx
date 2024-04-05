import {memo} from 'react';
import ReactAvatar from 'react-avatar';

export interface IAvatar {
    userAvatar: string;
    userName: string;
}

export const Avatar = memo<IAvatar>(({userAvatar, userName}) => {
    return <ReactAvatar size="40px" round name={userName ?? 'User Name'} src={userAvatar} />;
});
