import {useSession} from 'next-auth/react';
import {ReactNode, useMemo} from 'react';

import {AuthContext} from '@/modules/Auth/context';
import {IAuthProvider} from '@/modules/Auth/types';

export const AuthProvider = ({children}: {children: ReactNode}) => {
    const session = useSession();

    const value = useMemo<IAuthProvider>(() => {
        return {
            session: session.status,
            userAvatar: session.data?.user?.image,
            userId: session.data?.user?.id,
            userName: session.data?.user?.name,
        };
    }, [session]);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
