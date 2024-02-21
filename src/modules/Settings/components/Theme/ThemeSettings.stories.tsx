import type {Meta, StoryObj} from '@storybook/react';

import {decorators} from '../../../../helpers';
import {ThemeSetting} from './index';

const meta = {
    component: ThemeSetting,
    decorators: decorators,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
    title: 'Setting/ThemeSetting',
} satisfies Meta<typeof ThemeSetting>;

export default meta;

type TStory = StoryObj<typeof meta>;

export const ThemeSettingStory: TStory = {
    args: {
        handleApprove: () => {
            location?.reload();
        },
    },
    render: (arg) => {
        return <ThemeSetting {...arg} />;
    },
};
