'use server';
import prismaClient from '../../../core/prisma';
import {IGoal, TUid} from '../../../model';

export const getArchiveGoalById = async ({goalId, uid}: {goalId: IGoal['id']; uid: TUid}) => {
    return prismaClient.$queryRaw<IGoal[]>`select name, description  from GoalArchive where id  = ${goalId} AND userUid = ${uid}`;
};
