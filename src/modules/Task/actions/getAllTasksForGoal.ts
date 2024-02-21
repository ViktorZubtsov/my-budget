'use server';
// eslint-disable-next-line camelcase
import {unstable_cache} from 'next/cache';

import prismaClient from '../../../core/prisma';
import {IGoal, TTask} from '../../../model';

interface IGetAllTasksForGoalParams {
    goalId: IGoal['id'];
}

export const getAllTasksForGoal = unstable_cache(
    async ({goalId}: IGetAllTasksForGoalParams) => {
        return prismaClient.$queryRaw<TTask[]>`select * from Task where  goalId = ${goalId} order by done `;
    },
    ['getAllTasksForGoal'],
    {tags: ['task']}
);
