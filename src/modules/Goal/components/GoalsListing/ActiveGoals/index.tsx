import {memo} from 'react';

import {EmptyList} from '@/components/EmptyList';
import {AddGoal} from '@/modules/Goal/components/AddGoal';
import {GoalItem} from '@/modules/Goal/components/GoalItem/Index';
import {useGoal} from '@/modules/Goal/hooks/useGoal';
import {useLoaderStore} from '@/store/loaderStore';

import {ActiveGoalsStyled} from './styled';

export const ActiveGoals = memo(() => {
    const {goalsList} = useGoal();
    const {isProcessLoader} = useLoaderStore();

    return (
        <ActiveGoalsStyled pb="16x">
            {!goalsList.length && <EmptyList text="Список целей пуст" />}
            {goalsList && goalsList.map((goal) => <GoalItem isBlock={isProcessLoader} key={goal.id} goal={goal} onRemove={() => {}} />)}
            <AddGoal />
        </ActiveGoalsStyled>
    );
});
