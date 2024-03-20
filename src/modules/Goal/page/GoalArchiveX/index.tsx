'use client';
import {NotFoundControllerException} from '@/core/exceptions/NotFoundControllerException';
import {IGoal} from '@/model';
import {GoalXHeader} from '@/modules/Goal/components/GoalXHeader';
import {useArchiveGoals} from '@/modules/Goal/hooks/useArchiveGoals';
import {useAccount} from '@/modules/Settings/hooks/useAccount';
import {useTaskArchiveList} from '@/modules/Task/hooks/useTaskArchiveList';
import {ArchiveTaskListing} from '@/modules/Task/sectoin/ArchiveTaskListing';

export const GoalArchiveX = ({goalId}: {goalId: IGoal['id']}) => {
    const {goal} = useArchiveGoals(goalId);
    const {taskArchiveList} = useTaskArchiveList(goalId);
    const {accountsList} = useAccount();

    if (!goal) {
        throw new NotFoundControllerException('Not found');
    }

    return (
        <div>
            <GoalXHeader goal={goal} />
            <ArchiveTaskListing taskList={taskArchiveList} accountsList={accountsList} />
        </div>
    );
};
