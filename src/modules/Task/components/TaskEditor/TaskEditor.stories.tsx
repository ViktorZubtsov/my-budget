import type {Meta, StoryObj} from '@storybook/react';

import {TEST_ID_ACCOUNT, TEST_ID_ADD_TASK} from '@/constant/dataTest';
import {MOCK_ACCOUNT, MOCK_TASK} from '@/mock';
import {TaskEditor} from '@/modules/Task/components/TaskEditor/index';

import {decorators} from '../../../../helpers';

const args = {
    addAccount: () => {},
    dataTest: {
        accountsCard: TEST_ID_ADD_TASK.ACCOUNTS_CARD,
        button: TEST_ID_ADD_TASK.SUBMIT,
        name: TEST_ID_ADD_TASK.NAME,
        price: TEST_ID_ADD_TASK.PRICE,
        select: TEST_ID_ACCOUNT.SELECT,
    },
    isAccountsFetching: false,
    isEdit: false,
    isFetching: false,
    isOpen: true,
    onClose: () => {},
    onSubmit: () => {},
    title: 'Task',
};

const meta = {
    component: TaskEditor,
    decorators: decorators,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
    title: 'Task/TaskEditor',
} satisfies Meta<typeof TaskEditor>;

export default meta;

type TStory = StoryObj<typeof meta>;

export const TaskEditorEmptyStory: TStory = {
    args: {
        accountsList: [MOCK_ACCOUNT],
        ...args,
    },
    render: (arg) => {
        return <TaskEditor {...arg} />;
    },
};

export const TaskEditorEmptyAccountsStory: TStory = {
    args: {
        accountsList: [],
        ...args,
    },
    render: (arg) => {
        return <TaskEditor {...arg} />;
    },
};
export const TaskEditorEditStory: TStory = {
    args: {
        accountsList: [MOCK_ACCOUNT],
        defaultValues: {
            bankAccount: MOCK_TASK['bankAccount'],
            name: MOCK_TASK['name'],
            price: MOCK_TASK['price'],
        },
        ...args,
        isEdit: true,
    },
    render: (arg) => {
        return <TaskEditor {...arg} />;
    },
};
