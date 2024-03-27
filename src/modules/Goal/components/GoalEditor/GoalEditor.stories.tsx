import type {Meta, StoryObj} from '@storybook/react';

import {GOAL_EDITOR_SUBMIT_TEXT, GOAL_EDITOR_TITLE} from '@/modules/Goal/components/GoalEditor/constants';
import {GoalEditor} from '@/modules/Goal/components/GoalEditor/index';

import {decorators} from '../../../../helpers';

const meta = {
    component: GoalEditor,
    decorators: decorators,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
    title: 'Goal/GoalEditor',
} satisfies Meta<typeof GoalEditor>;

export default meta;

type TStory = StoryObj<typeof meta>;

export const GoalEditorEmptyStory: TStory = {
    args: {
        handeClose: () => {},
        isFetch: false,
        isOpen: true,
        onSubmit: () => {},
        submitText: GOAL_EDITOR_SUBMIT_TEXT,
        title: GOAL_EDITOR_TITLE,
    },
    render: (arg) => {
        return <GoalEditor {...arg} />;
    },
};
