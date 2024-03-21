'use client';
import {NotFoundControllerException} from '@/core/exceptions/NotFoundControllerException';
import {IGoal} from '@/model';
import {GoalXHeader} from '@/modules/Goal/components/GoalXHeader';
import {GoalXListing} from '@/modules/Goal/components/GoalXListing';
import {useGoalX} from '@/modules/Goal/hooks/useGoalX';
import {GoalProvider} from '@/modules/Goal/providers';

export const GoalXPage = ({goalId}: {goalId: IGoal['id']}) => {
    const {goal} = useGoalX(goalId);

    if (!goal) {
        throw new NotFoundControllerException('Not found');
    }

    return (
        <GoalProvider goal={goal}>
            <div>
                <GoalXHeader goal={goal} />
                <GoalXListing />
            </div>
        </GoalProvider>
    );
};
