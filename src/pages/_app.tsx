import {NextPage} from 'next';
import {AppProps} from 'next/app';
import {SessionProvider} from 'next-auth/react';
import {ReactElement, ReactNode, StrictMode} from 'react';
import {SWRConfig} from 'swr';

import {fetcher} from '../core/http';
import RootLayout from '../layouts/layout';
import {AuthProvider} from '../modules/Auth/providers';
import {ProcessLoaderProvider} from '../providers';

export type TNextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode;
};

type TAppPropsWithLayout = AppProps & {
    Component: TNextPageWithLayout;
};

// eslint-disable-next-line @typescript-eslint/naming-convention
function MyBudget({Component, pageProps}: TAppPropsWithLayout) {
    return (
        <StrictMode>
            <SWRConfig value={{fallback: pageProps?.fallback, fetcher}}>
                <SessionProvider>
                    <AuthProvider>
                        <ProcessLoaderProvider>
                            <RootLayout>
                                <Component {...pageProps} />
                            </RootLayout>
                        </ProcessLoaderProvider>
                    </AuthProvider>
                </SessionProvider>
            </SWRConfig>
        </StrictMode>
    );
}

export default MyBudget;
