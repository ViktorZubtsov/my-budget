import 'react-swipeable-list/dist/styles.css';

import {ReactNode} from 'react';

import {Header} from '@/components/Header';
import Provider from '@/core/provider';

export default function RootLayout({children}: {children: ReactNode}) {
    return (
        <Provider>
            <>
                <Header logoImg="/logo.svg" />
                {children}
            </>
        </Provider>
    );
}
