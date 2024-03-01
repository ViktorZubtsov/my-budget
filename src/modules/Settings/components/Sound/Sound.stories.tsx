import type {Meta, StoryObj} from '@storybook/react';

import {SoundSetting} from '@/modules/Settings/components/Sound/index';

import {decorators} from '../../../../helpers';

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

export const SoundSettingStoryOff: TStory = {
    args: {
        isChecked: false,
    },
    render: (arg) => {
        return <SoundSetting {...arg} />;
    },
};
export const SoundSettingStoryOn: TStory = {
    args: {
        isChecked: true,
    },
    render: (arg) => {
        return <SoundSetting {...arg} />;
    },
};
