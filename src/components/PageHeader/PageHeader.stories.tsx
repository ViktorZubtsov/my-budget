import type {Meta, StoryObj} from '@storybook/react';

import {decorators} from '../../../src/helpers';
import {PageHeader} from './index';

const meta = {
    component: PageHeader,
    decorators: decorators,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
    title: 'Components/PageHeader',
} satisfies Meta<typeof PageHeader>;

export default meta;

type TStory = StoryObj<typeof meta>;

export const PageHeaderStory: TStory = {
    args: {
        title: 'Title',
    },
    render: (arg) => {
        return <PageHeader {...arg} />;
    },
};
