import {Goal, Task, User} from '@prisma/client';

import {ACCOUNTS_COLORS} from '@/constant';

export interface IUser extends User {}

export type TTask = Task;

export interface IGoal extends Goal {}
export interface IGoalShort {
    id: Goal['id'];
    name: Goal['name'];
    description: Goal['description'];
}
export type TUid = User['id'];

export type TAccountsColors = keyof typeof ACCOUNTS_COLORS;

export interface IAccount {
    colorCode: TAccountsColors;
    id: string;
    name: string;
}
