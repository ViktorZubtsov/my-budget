import type {Meta, StoryObj} from '@storybook/react';

import {decorators} from '../../../src/helpers';
import {AddButton} from './index';

const meta = {
    component: AddButton,
    decorators: decorators,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
    title: 'Components/AddButton',
} satisfies Meta<typeof AddButton>;

export default meta;

type TStory = StoryObj<typeof meta>;

export const AddButtonStory: TStory = {
    args: {
        onClick: () => {},
    },
    render: (arg) => {
        return <AddButton {...arg} />;
    },
};
