import type {Meta, StoryObj} from '@storybook/react';

import {TaskSum} from '@/modules/Task/components/TaskSum/index';

import {decorators} from '../../../../helpers';

const meta = {
    component: TaskSum,
    decorators: decorators,
    parameters: {
        layout: 'fullscreen',
        nextjs: {
            appDirectory: true,
        },
    },
    tags: ['autodocs'],
    title: 'Task/TaskSum',
} satisfies Meta<typeof TaskSum>;

export default meta;

type TStory = StoryObj<typeof meta>;

export const TaskSumStory: TStory = {
    args: {
        sum: 1_000.2568,
    },
    render: (arg) => {
        return <TaskSum {...arg} />;
    },
};
