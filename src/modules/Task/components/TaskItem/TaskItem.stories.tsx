import type {Meta, StoryObj} from '@storybook/react';

import {MOCK_TASK} from '@/mock';
import {TaskItem} from '@/modules/Task/components/TaskItem/index';

import {decorators} from '../../../../helpers';

const meta = {
    component: TaskItem,
    decorators: decorators,
    parameters: {
        layout: 'fullscreen',
        nextjs: {
            appDirectory: true,
        },
    },
    tags: ['autodocs'],
    title: 'Task/TaskItem',
} satisfies Meta<typeof TaskItem>;

export default meta;

type TStory = StoryObj<typeof meta>;

export const TaskItemStory: TStory = {
    args: {
        accountsList: [],
        onAccept: () => {},
        onEdit: () => {},
        onRemove: () => {},
        task: MOCK_TASK,
    },
    render: (arg) => {
        return <TaskItem {...arg} />;
    },
};
