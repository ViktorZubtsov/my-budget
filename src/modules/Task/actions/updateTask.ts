'use server';
import {revalidateTag} from 'next/cache';

import prismaClient from '../../../core/prisma';
import {IGoal, TTask} from '../../../model';

interface IDeleteTaskParams {
    taskId: TTask['id'];
    task: {
        name?: TTask['name'];
        price?: TTask['price'];
        bankAccount?: TTask['bankAccount'];
    };
}

export const updateTask = async ({taskId, task}: IDeleteTaskParams) => {
    await fetch(`${process.env.NEXTAUTH_URL}/api/task`, {
        body: JSON.stringify({...task, taskId}),
        headers: {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            'Content-Type': 'application/json',
        },
        method: 'POST',
    });
    revalidateTag('task');
};
