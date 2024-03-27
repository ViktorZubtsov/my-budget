import prismaClient from '@/core/prisma';
import {IGoal, TTask} from '@/model';

export interface ICreateTaskParams {
    goalId: IGoal['id'];
    task: {
        name: TTask['name'];
        price: TTask['price'];
        bankAccount: TTask['bankAccount'];
    };
}

export const addTask = async ({goalId, task}: ICreateTaskParams) => {
    return prismaClient.task.create({
        data: {
            ...task,
            done: false,
            goal: {connect: {id: goalId}},
        },
    });
};

export async function addTaskQuery(url: string, {arg}: {arg: {task: ICreateTaskParams['task']}}) {
    const {task} = arg;

    await fetch(url, {
        body: JSON.stringify({
            task,
        }),
        method: 'POST',
    });
}
