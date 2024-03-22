import prismaClient from '@/core/prisma';
import {IGoal, TTask} from '@/model';

interface IGetAllTasksForGoalParams {
    goalId: IGoal['id'];
}

export const getAllArchiveTasksForGoal = async ({goalId}: IGetAllTasksForGoalParams) => {
    return prismaClient.$queryRaw<TTask[]>`select * from TaskArchive where  goalId = ${goalId} order by done `;
};
