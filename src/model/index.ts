import {User} from '@prisma/client';

import {ACCOUNTS_COLORS} from '../constant';

import {Goal, Task} from '.prisma/client';

export interface IUser extends User {}

export type TTask = Task;

export interface IGoal extends Goal {}
export type TUid = User['id'];

export type TAccountsColors = keyof typeof ACCOUNTS_COLORS;

export interface IAccount {
    colorCode: TAccountsColors;
    id: string;
    name: string;
}
