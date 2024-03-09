import {IAccount, IGoal} from '@/model';

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
