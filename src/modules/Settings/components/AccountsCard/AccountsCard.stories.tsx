import type {Meta, StoryObj} from '@storybook/react';

import {MOCK_ACCOUNT} from '@/mock';
import {AccountsCard} from '@/modules/Settings/components/AccountsCard/index';

import {decorators} from '../../../../helpers';

const meta = {
    component: AccountsCard,
    decorators: decorators,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
    title: 'Setting/AccountsCard',
} satisfies Meta<typeof AccountsCard>;

export default meta;

type TStory = StoryObj<typeof meta>;

export const AccountsCardStoryEmpty: TStory = {
    args: {
        accountsList: [],
        addAccount: () => {},
        isFetching: false,
    },
    render: (arg) => {
        return <AccountsCard {...arg} />;
    },
};
export const AccountsCardStoryOneItem: TStory = {
    args: {
        accountsList: [MOCK_ACCOUNT],
        addAccount: () => {},
        isFetching: false,
    },
    render: (arg) => {
        return <AccountsCard {...arg} />;
    },
};
