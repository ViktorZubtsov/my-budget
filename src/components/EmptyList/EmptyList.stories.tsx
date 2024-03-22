import type {Meta, StoryObj} from '@storybook/react';

import {EmptyList} from '@/components/EmptyList/index';

import {decorators} from '../../../src/helpers';

const meta = {
    component: EmptyList,
    decorators: decorators,
    parameters: {
        layout: 'fullscreen',
        nextjs: {
            appDirectory: true,
        },
    },
    tags: ['autodocs'],
    title: 'Components/EmptyList',
} satisfies Meta<typeof EmptyList>;

export default meta;

type TStory = StoryObj<typeof meta>;

export const EmptyListStory: TStory = {
    args: {
        text: 'Список пуст',
    },
    render: (arg) => {
        return <EmptyList {...arg} />;
    },
};
