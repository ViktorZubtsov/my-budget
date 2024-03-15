import type {Meta, StoryObj} from '@storybook/react';

import {MOCK_GOAL} from '@/mock';
import {GoalItem} from '@/modules/Goal/components/GoalItem/Index';

import {decorators} from '../../../../helpers';

const meta = {
    component: GoalItem,
    decorators: decorators,
    parameters: {
        layout: 'fullscreen',
        nextjs: {
            appDirectory: true,
        },
    },
    tags: ['autodocs'],
    title: 'Goal/GoalElement',
} satisfies Meta<typeof GoalItem>;

export default meta;

type TStory = StoryObj<typeof meta>;

export const GoalItemStory: TStory = {
    args: {
        goal: MOCK_GOAL,
        isBlock: false,
        onRemove: () => {},
    },
    render: (arg) => {
        return <GoalItem {...arg} />;
    },
};
export const GoalItemNotDescriptionStory: TStory = {
    args: {
        goal: {...MOCK_GOAL, description: ''},
        isBlock: false,
        onRemove: () => {},
    },
    render: (arg) => {
        return <GoalItem {...arg} />;
    },
};
