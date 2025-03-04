import 'react-toastify/dist/ReactToastify.css';
import 'react-swipeable-list/dist/styles.css';

import {darkEva, darkJoy, darkSber} from '@salutejs/plasma-tokens/themes';
import {SSRProvider} from '@salutejs/plasma-ui';
import {DeviceThemeProvider} from '@salutejs/plasma-ui';
import {NotificationsProvider} from '@salutejs/plasma-web';
import dynamic from 'next/dynamic';
import {memo, ReactNode, useEffect, useState} from 'react';
import {ToastContainer} from 'react-toastify';
import {createGlobalStyle} from 'styled-components';

import ErrorBoundary from '@/components/ErrorBoundary';
import Loading from '@/components/Loading';
import {LOCAL_STORAGE_KEYS, THEME} from '@/constant';
import {MainStyle} from '@/style';

const GlobalStyle = memo<{onSuccess: () => void}>(({onSuccess}) => {
    const Style = dynamic(() => import('./GlobalStyle'));

    useEffect(() => {
        onSuccess();
    }, [Style, onSuccess]);
    return <Style />;
});

const Provider = ({children}: {children: ReactNode}) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const isProd = 'production' === process.env.NODE_ENV;

    function currentTheme() {
        let theme = THEME.DARK_SBER;
        if ('undefined' !== typeof window) {
            theme = localStorage.getItem(LOCAL_STORAGE_KEYS.THEME) ?? THEME.DARK_SBER;
        }

        switch (theme) {
            case THEME.DARK_SBER:
                return darkSber;
            case THEME.DARK_EVA:
                return darkEva;
            case THEME.DARK_JOY:
                return darkJoy;
            default:
                return darkSber;
        }
    }

    const ThemeStyle = createGlobalStyle(currentTheme());

    const handleSuccess = () => {
        return setIsLoading(false);
    };

    return (
        <>
            <DeviceThemeProvider responsiveTypo>
                <SSRProvider>
                    <NotificationsProvider>
                        {isLoading ? (
                            <Loading />
                        ) : (
                            <>
                                <ErrorBoundary>{children}</ErrorBoundary>
                            </>
                        )}
                    </NotificationsProvider>
                    <GlobalStyle onSuccess={handleSuccess} />
                    <ThemeStyle />
                </SSRProvider>
                <ToastContainer />
            </DeviceThemeProvider>
            <MainStyle />
        </>
    );
};
export default Provider;
