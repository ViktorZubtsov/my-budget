'use client';
import {NotFoundControllerException} from '@/core/exceptions/NotFoundControllerException';
import {IGoal} from '@/model';
import {GoalXHeader} from '@/modules/Goal/components/GoalXHeader';
import {useArchiveGoals} from '@/modules/Goal/hooks/useArchiveGoals';
import {GoalProvider} from '@/modules/Goal/providers';
import {ArchiveTaskListing} from '@/modules/Task/sectoin/ArchiveTaskListing';

export const GoalArchiveX = ({goalId}: {goalId: IGoal['id']}) => {
    const {goal} = useArchiveGoals(goalId);

    if (!goal) {
        throw new NotFoundControllerException('Not found');
    }

    return (
        <GoalProvider goal={goal}>
            <div>
                <GoalXHeader goal={goal} />
                <ArchiveTaskListing />
            </div>
        </GoalProvider>
    );
};
