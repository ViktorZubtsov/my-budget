import {createContext} from 'react';

import {IAuthProvider} from '../types';

export const AuthContext = createContext<IAuthProvider>({
    session: 'unauthenticated',
    userAvatar: '',
    userId: '',
    userName: '',
});
