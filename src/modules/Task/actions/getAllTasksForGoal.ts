import prismaClient from '@/core/prisma';
import {IGoal, TTask} from '@/model';

interface IGetAllTasksForGoalParams {
    goalId: IGoal['id'];
}

export const getAllTasksForGoal = async ({goalId}: IGetAllTasksForGoalParams) => {
    return prismaClient.$queryRaw<TTask[]>`select * from Task where  goalId = ${goalId}  order by done `;
};

export async function getTaskListQuery(url: string) {
    return fetch(url, {
        method: 'GET',
    });
}
