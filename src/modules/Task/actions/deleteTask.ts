import prismaClient from '@/core/prisma';
import {TTask} from '@/model';

interface IDeleteTaskParams {
    taskId: TTask['id'];
}

export const deleteTask = async ({taskId}: IDeleteTaskParams) => {
    return prismaClient.$queryRaw`DELETE FROM Task where id = ${taskId}`;
};

export async function removeTaskQuery(url: string, {arg}: {arg: IDeleteTaskParams}) {
    const {taskId} = arg;

    await fetch(url, {
        body: JSON.stringify({
            taskId,
        }),
        method: 'DELETE',
    });
}
