import type {Meta, StoryObj} from '@storybook/react';

import {IGoal} from '@/model';
import {GoalItem} from '@/modules/Goal/components/GoalItem/Index';

import {decorators} from '../../../../helpers';

const meta = {
    component: GoalItem,
    decorators: decorators,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
    title: 'Goal/GoalElement',
} satisfies Meta<typeof GoalItem>;

export default meta;

type TStory = StoryObj<typeof meta>;
const mock: IGoal = {
    createdAt: new Date(),
    description: 'description',
    id: '1',
    name: 'name',
    updatedAt: new Date(),
    userUid: '',
};
export const GoalItemStory: TStory = {
    args: {
        goal: mock,
        isBlock: false,
        onRemove: () => {},
    },
    render: (arg) => {
        return <GoalItem {...arg} />;
    },
};
