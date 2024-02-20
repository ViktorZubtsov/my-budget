import type {Meta, StoryObj} from '@storybook/react';

import {Header} from './index';
import {ProcessLoaderContext} from '../../context';
import {decorators} from '../../helpers';
import {AuthContext} from '../../modules/Auth/context';

const meta = {
    component: Header,
    decorators: decorators,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
    title: 'Header',
} satisfies Meta<typeof Header>;

export default meta;

type TStory = StoryObj<typeof meta>;

export const HeaderAuth: TStory = {
    args: {
        logoImg: '/images/logo.svg',
    },
    render: ({logoImg}) => {
        return (
            <AuthContext.Provider
                value={{
                    session: 'authenticated',
                    userAvatar: '',
                    userId: '',
                    userName: 'User Name',
                }}
            >
                <ProcessLoaderContext.Provider value={false}>
                    <Header logoImg={logoImg} />
                </ProcessLoaderContext.Provider>
            </AuthContext.Provider>
        );
    },
};
export const HeaderNotAuth: TStory = {
    args: {
        logoImg: '/images/logo.svg',
    },
    render: ({logoImg}) => {
        return (
            <AuthContext.Provider
                value={{
                    session: 'unauthenticated',
                    userAvatar: '',
                    userId: '',
                    userName: 'User Name',
                }}
            >
                <ProcessLoaderContext.Provider value={false}>
                    <Header logoImg={logoImg} />
                </ProcessLoaderContext.Provider>
            </AuthContext.Provider>
        );
    },
};
export const HeaderLoading: TStory = {
    args: {
        logoImg: '/images/logo.svg',
    },
    render: ({logoImg}) => {
        return (
            <AuthContext.Provider
                value={{
                    session: 'loading',
                    userAvatar: '',
                    userId: '',
                    userName: 'User Name',
                }}
            >
                <ProcessLoaderContext.Provider value={false}>
                    <Header logoImg={logoImg} />
                </ProcessLoaderContext.Provider>
            </AuthContext.Provider>
        );
    },
};
