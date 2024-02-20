'use server';
import {revalidateTag} from 'next/cache';

import prismaClient from '../../../core/prisma';
import {IGoal, TTask} from '../../../model';

interface IDeleteTaskParams {
    taskId: TTask['id'];
}

export const deleteTask = async ({taskId}: IDeleteTaskParams) => {
    await prismaClient.$queryRaw`DELETE FROM Task where id = ${taskId}`;
    revalidateTag('task');
};
