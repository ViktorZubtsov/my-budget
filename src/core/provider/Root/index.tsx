'use client';
import {SessionProvider} from 'next-auth/react';
import {ReactNode, StrictMode} from 'react';

import RootLayout from '@/layouts/layout';
import {AuthProvider} from '@/modules/Auth/providers';
import {ProcessLoaderProvider} from '@/providers';

export const RootProvider = ({children}: {children: ReactNode}) => {
    return (
        <StrictMode>
            <SessionProvider basePath={`/test/api/auth`}>
                <AuthProvider>
                    <ProcessLoaderProvider>
                        <RootLayout>{children}</RootLayout>
                    </ProcessLoaderProvider>
                </AuthProvider>
            </SessionProvider>
        </StrictMode>
    );
};
