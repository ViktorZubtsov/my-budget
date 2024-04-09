import prismaClient from '@/core/prisma';
import {IGoal, TUid} from '@/model';

export const getGoalsArchiveListByUid = async (uid: TUid) => {
    return prismaClient.$queryRaw<IGoal[]>`select name, description, id from GoalArchive where userUid = ${uid} order by createdAt desc`;
};
