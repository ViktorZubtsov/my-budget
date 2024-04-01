import {IAccount, IGoal, TTask} from '@/model';

export const MOCK_GOAL: IGoal = {
    createdAt: new Date(),
    description: 'description',
    id: '1',
    name: 'name',
    updatedAt: new Date(),
    userUid: '',
};

export const MOCK_ACCOUNT: IAccount = {
    colorCode: 'critical',
    id: '1',
    name: 'Name',
};
export const MOCK_ACCOUNT_TWO: IAccount = {
    colorCode: 'green',
    id: '2',
    name: 'Name 2',
};
export const MOCK_ACCOUNT_LIST: IAccount[] = [MOCK_ACCOUNT, MOCK_ACCOUNT_TWO];

export const MOCK_TASK: TTask = {
    bankAccount: MOCK_ACCOUNT.id,
    createdAt: new Date(),
    done: false,
    goalId: 'goal-id',
    id: '1',
    name: 'Task Name',
    price: 1_000,
    updatedAt: new Date(),
};
