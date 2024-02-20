'use server';
import prismaClient from '../../../core/prisma';
import {IGoal, TUid} from '../../../model';

export const getGoalById = async ({goalId, uid}: {goalId: IGoal['id']; uid: TUid}) => {
    return prismaClient.$queryRaw<IGoal[]>`select name, description  from Goal where id  = ${goalId} AND userUid = ${uid}`;
};
