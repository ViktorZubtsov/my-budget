'use server';
// eslint-disable-next-line camelcase
import {unstable_cache} from 'next/cache';

import prismaClient from '../../../core/prisma';
import {IGoal, TUid} from '../../../model';

export const getGoalsArchiveListByUid = unstable_cache(
    async (uid: TUid) => {
        return prismaClient.$queryRaw<IGoal[]>`select name, description, id from GoalArchive where userUid = ${uid} order by createdAt asc`;
    },
    ['getGoalsArchiveListByUid'],
    {tags: ['goal']}
);
