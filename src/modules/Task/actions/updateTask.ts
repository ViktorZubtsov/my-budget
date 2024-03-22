import prismaClient from '@/core/prisma';
import {TTask} from '@/model';

export interface ITaskUpdateParams {
    taskId: TTask['id'];
    task: {
        name?: TTask['name'];
        price?: TTask['price'];
        bankAccount?: TTask['bankAccount'];
    };
}

export const updateTask = async ({taskId, task}: ITaskUpdateParams) => {
    const {bankAccount, price, name} = task;

    return prismaClient.$queryRaw`
                update   Task
                set   
                bankAccount =  ${bankAccount},
                price =  ${price},
                name =  ${name}
                where id = ${taskId}
    `;
};

export async function updateTaskQuery(url: string, {arg}: {arg: ITaskUpdateParams}) {
    const {taskId, task} = arg;

    await fetch(url, {
        body: JSON.stringify({
            task,
            taskId,
        }),
        method: 'PUT',
    });
}
