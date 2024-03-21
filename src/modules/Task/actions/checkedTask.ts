import prismaClient from '@/core/prisma';
import {TTask} from '@/model';

export interface IDeleteTaskParams {
    taskId: TTask['id'];
    isDone: TTask['done'];
}

export const checkedTask = async ({taskId, isDone}: IDeleteTaskParams) => {
    return prismaClient.$queryRaw`update   Task set  done =  ${isDone} where id = ${taskId}`;
};

export async function checkedTaskQuery(url: string, {arg}: {arg: IDeleteTaskParams}) {
    const {taskId, isDone} = arg;

    await fetch(url, {
        body: JSON.stringify({
            isDone,
            taskId,
        }),
        method: 'PATCH',
    });
}
