import {useContext} from 'react';
import useSWR from 'swr';

import {getGoalXKey} from '@/core/SWRKeys';
import {IGoal, IGoalShort} from '@/model';
import {AuthContext} from '@/modules/Auth/context';
import {goalDataTransform} from '@/modules/Goal/helpers/goalDataTransform';

export const useGoalX = (goalId: IGoal['id']) => {
    const {userId} = useContext(AuthContext);
    const {data} = useSWR<IGoalShort[]>(getGoalXKey(userId, goalId), {revalidateOnMount: false});

    return {
        goal: goalDataTransform(data ?? []),
    };
};
