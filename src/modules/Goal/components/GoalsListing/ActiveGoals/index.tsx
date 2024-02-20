import {memo} from 'react';

import {EmptyList} from '../../../../../components/EmptyList';
import {AddGoal} from '../../AddGoal';
import {GoalItem} from '../../GoalItem/Index';
import {ActiveGoalsStyled} from './styled';
import {useGoal} from '../../../hooks';
import {useLoaderStore} from '../../../../../store/loaderStore';

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
