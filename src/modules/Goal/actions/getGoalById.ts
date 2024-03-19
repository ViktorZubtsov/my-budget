import prismaClient from '@/core/prisma';
import {IGoalShort, TUid} from '@/model';

export const getGoalById = async ({goalId, uid}: {goalId: IGoalShort['id']; uid: TUid}) => {
    return prismaClient.$queryRaw<IGoalShort[]>`select name, description, id  from Goal where id  = ${goalId} AND userUid = ${uid}`;
};
