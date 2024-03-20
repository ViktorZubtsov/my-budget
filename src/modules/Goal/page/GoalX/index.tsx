'use client';
import {NotFoundControllerException} from '@/core/exceptions/NotFoundControllerException';
import {IGoal} from '@/model';
import {GoalXHeader} from '@/modules/Goal/components/GoalXHeader';
import {GoalXListing} from '@/modules/Goal/components/GoalXListing';
import {useGoalX} from '@/modules/Goal/hooks/useGoalX';
import {useAccount} from '@/modules/Settings/hooks/useAccount';
import {useTaskList} from '@/modules/Task/hooks/useTaskList';

export const GoalXPage = ({goalId}: {goalId: IGoal['id']}) => {
    const {goal} = useGoalX(goalId);
    const {taskList} = useTaskList(goalId);
    const {accountsList} = useAccount();

    if (!goal) {
        throw new NotFoundControllerException('Not found');
    }

    return (
        <div>
            <GoalXHeader goal={goal} />
            <GoalXListing taskList={taskList} accountsList={accountsList} />
        </div>
    );
};
