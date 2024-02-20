import type {Meta, StoryObj} from '@storybook/react';

import {decorators} from '../../../../helpers';
import {GOAL_EDITOR_SUBMIT_TEXT, GOAL_EDITOR_TITLE} from './constants';
import {GoalEditor} from './index';

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

export const GoalEditorStory: TStory = {
    args: {
        handeClose: () => {
            return;
        },
        isFetch: false,
        isOpen: true,
        onSubmit: () => {
            return;
        },
        submitText: GOAL_EDITOR_SUBMIT_TEXT,
        title: GOAL_EDITOR_TITLE,
    },
    render: (arg) => {
        return <GoalEditor {...arg} />;
    },
};
