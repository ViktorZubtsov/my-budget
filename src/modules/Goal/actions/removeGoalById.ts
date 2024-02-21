'use server';
import {revalidateTag} from 'next/cache';

import prismaClient from '../../../core/prisma';
import {IGoal, IUser, TTask, TUid} from '../../../model';

export interface IGoalArchive extends IGoal {
    tasks: TTask[];
}

interface IRemoveGoalParams {
    goalId: IGoal['id'];
    removeOBJ: IGoal;
    uid: TUid;
    goal: IGoalArchive | null;
}

export const removeGoalById = async ({goalId, goal, uid}: IRemoveGoalParams) => {
    await prismaClient.$transaction([
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
    revalidateTag('goal');
};
