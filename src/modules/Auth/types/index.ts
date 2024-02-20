import {SessionContextValue} from 'next-auth/react';

export interface IAuthProvider {
    userId: string;
    userAvatar: string;
    userName: string;
    session: SessionContextValue['status'];
}
