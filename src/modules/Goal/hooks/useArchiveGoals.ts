import {useContext} from 'react';
import useSWR from 'swr';

import {getArchiveGoalListKey, getGoalArchiveXKey} from '@/core/SWRKeys';
import {IGoal} from '@/model';
import {AuthContext} from '@/modules/Auth/context';
import {goalDataTransform} from '@/modules/Goal/helpers/goalDataTransform';

export const useArchiveGoals = (goalId?: IGoal['id']) => {
    const {userId} = useContext(AuthContext);
    const {data, isLoading} = useSWR<IGoal[]>(getArchiveGoalListKey(userId));
    const {data: goal} = useSWR<IGoal[]>(getGoalArchiveXKey(userId, goalId ?? ''));

    return {
        archiveGoalList: data ?? [],
        goal: goalDataTransform(goal ?? []),
        isLoading,
    };
};
