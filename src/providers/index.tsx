import {ReactNode} from 'react';

import {ProcessLoaderContext} from '../context';
import {useLoaderStore} from '../store/loaderStore';

export const ProcessLoaderProvider = ({children}: {children: ReactNode}) => {
    const {isProcessLoader} = useLoaderStore();

    return <ProcessLoaderContext.Provider value={isProcessLoader}>{children}</ProcessLoaderContext.Provider>;
};
