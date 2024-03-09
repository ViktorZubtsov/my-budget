import {createContext} from 'react';

import {IAuthProvider} from '@/modules/Auth/types';

export const AuthContext = createContext<IAuthProvider>({
    session: 'unauthenticated',
    userAvatar: '',
    userId: '',
    userName: '',
});
