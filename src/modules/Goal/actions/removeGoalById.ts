import prismaClient from '@/core/prisma';
import {IGoal, TTask, TUid} from '@/model';

export interface IGoalArchive extends IGoal {
    tasks: TTask[];
}

export interface IRemoveGoalParams {
    goalId: IGoal['id'];
    uid: TUid;
    goal: IGoalArchive | null;
}

export const removeGoalById = async ({goalId, goal, uid}: IRemoveGoalParams) => {
    return prismaClient.$transaction([
        prismaClient.goalArchive.create({
            data: {
                description: goal?.description ?? '',
                name: goal?.name ?? '',
                tasks: {
                    create:
                        goal?.tasks.map((item) => {
                            const {goalId: test, done, ...other} = item;

                            return {
                                done: Boolean(done),
                                ...other,
                            };
                        }) ?? [],
                },
                user: {connect: {id: uid}},
            },
        }),
        prismaClient.$queryRaw`DELETE FROM  Task where goalId = ${goalId}`,
        prismaClient.$queryRaw`DELETE FROM  Goal where id =  ${goalId}`,
    ]);
};

export async function removeGoalQuery(url: string, {arg}: {arg: Omit<IRemoveGoalParams, 'uid'>}) {
    const {goalId, goal} = arg;

    await fetch(url, {
        body: JSON.stringify({
            goal,
            goalId,
        }),
        method: 'DELETE',
    });
}
