import prismaClient from '@/core/prisma';
import {IGoal, TUid} from '@/model';

export const getGoalsListByUid = async (uid: TUid) => {
    return prismaClient.$queryRaw<IGoal[]>`SELECT id, userUid, description, name  FROM Goal WHERE userUid = ${uid} order by createdAt asc`;
};
