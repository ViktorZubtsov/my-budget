import {create} from 'zustand';

interface IUseLoaderStore {
    isProcessLoader: boolean;
    isLocalLoader: boolean;
}

export const useLoaderStore = create<IUseLoaderStore>(() => ({
    isLocalLoader: false,
    isProcessLoader: false,
}));
