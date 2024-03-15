import prismaClient from '@/core/prisma';
import {IGoal, IUser} from '@/model';

export interface IAddGoalToUserParams {
    uid: IUser['id'];
    goal: {
        description: IGoal['description'];
        name: IGoal['name'];
        id: IGoal['id'];
    };
}

export const addGoalToUser = async ({goal, uid}: IAddGoalToUserParams) => {
    const {description, name, id} = goal;

    return prismaClient.$queryRaw<IGoal[]>`
        INSERT INTO Goal (id, updatedAt, description, name, userUid) 
        VALUES (${id},${new Date()},${description}, ${name}, ${uid});
    `;
};

export async function createGoalQuery(url: string, {arg}: {arg: {goal: IAddGoalToUserParams['goal']}}) {
    const {goal} = arg;

    await fetch(url, {
        body: JSON.stringify({
            goal,
        }),
        method: 'POST',
    });
}
