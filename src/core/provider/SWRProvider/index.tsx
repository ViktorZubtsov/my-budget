'use client';
import {ReactNode} from 'react';
import {SWRConfig} from 'swr';

import {fetcher} from '@/core/http';

export const SWRProvider = ({children, fallback}: {children: ReactNode; fallback: any}) => {
    return <SWRConfig value={{fallback, fetcher}}>{children}</SWRConfig>;
};
