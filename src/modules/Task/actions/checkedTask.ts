'use server';
import {revalidateTag} from 'next/cache';

import prismaClient from '../../../core/prisma';
import {IGoal, TTask} from '../../../model';

interface IDeleteTaskParams {
    taskId: TTask['id'];
    task: {
        done?: TTask['done'];
    };
}

export const checkedTask = async ({taskId, task}: IDeleteTaskParams) => {
    await prismaClient.$queryRaw`update   Task set  done =  ${task.done} where id = ${taskId}`;
    revalidateTag('task');
};
