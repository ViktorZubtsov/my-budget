import prismaClient from '@/core/prisma';
import {TTask} from '@/model';

interface ITaskUpdateParams {
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
