import type {Meta, StoryObj} from '@storybook/react';

import {decorators} from '../../../../helpers';
import {SoundSetting} from './index';

const meta = {
    component: SoundSetting,
    decorators: decorators,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
    title: 'Setting/SoundSetting',
} satisfies Meta<typeof SoundSetting>;

export default meta;

type TStory = StoryObj<typeof meta>;

export const SoundSettingStory: TStory = {
    args: {
        isChecked: true,
    },
    render: (arg) => {
        return <SoundSetting {...arg} />;
    },
};
