'use server';
import {revalidateTag} from 'next/cache';

import prismaClient from '../../../core/prisma';
import {IGoal, TTask} from '../../../model';

interface ICreateTaskParams {
    goalId: IGoal['id'];
    task: {
        name: TTask['name'];
        price: TTask['price'];
        bankAccount: TTask['bankAccount'];
    };
}

export const addTask = async ({goalId, task}: ICreateTaskParams) => {
    await prismaClient.task.create({
        data: {
            ...task,
            done: false,
            goal: {connect: {id: goalId}},
        },
    });
    revalidateTag('task');
};
