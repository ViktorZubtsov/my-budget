import {memo, useContext} from 'react';

import {EmptyList} from '@/components/EmptyList';
import {TEST_ID_GOAL} from '@/constant/dataTest';
import {MOCK_GOAL} from '@/mock';
import {AuthContext} from '@/modules/Auth/context';
import {AddGoal} from '@/modules/Goal/components/AddGoal';
import {GoalItem} from '@/modules/Goal/components/GoalItem/Index';
import {useGoal} from '@/modules/Goal/hooks/useGoal';
import {useLoaderStore} from '@/store/loaderStore';

import {ActiveGoalsStyled} from './styled';

export const ActiveGoals = memo(() => {
    const {session} = useContext(AuthContext);
    const isLoader = 'loading' === session;
    const {goalsList, removeGoal} = useGoal();
    const {isProcessLoader} = useLoaderStore();

    return (
        <ActiveGoalsStyled pb="16x" data-testid={TEST_ID_GOAL.LISTING}>
            {!goalsList.length && !isLoader && <EmptyList text="Список целей пуст" />}
            {isLoader && [1, 2, 3, 4, 5, 6].map((value) => <GoalItem key={value} skeleton isBlock goal={MOCK_GOAL} />)}
            {goalsList &&
                !isLoader &&
                goalsList.map((goal) => <GoalItem isBlock={isProcessLoader} key={goal.id} goal={goal} onRemove={removeGoal} />)}
            <AddGoal />
        </ActiveGoalsStyled>
    );
});
