'use server';
import {revalidatePath, revalidateTag} from 'next/cache';

import prismaClient from '../../../core/prisma';
import {IGoal, IUser} from '../../../model';

interface IAddGoalToUserParams {
    uid: IUser['id'];
    goal: {
        description: IGoal['description'];
        name: IGoal['name'];
        id: IGoal['id'];
    };
}

export const addGoalToUser = async ({goal, uid}: IAddGoalToUserParams) => {
    const {description, name, id} = goal;

    await prismaClient.$queryRaw<IGoal[]>`
        INSERT INTO Goal (id, updatedAt, description, name, userUid) 
        VALUES (${id},${new Date()},${description}, ${name}, ${uid});
    `;
    revalidateTag('goal');
};
