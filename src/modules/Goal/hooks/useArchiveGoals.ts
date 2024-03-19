import {useContext} from 'react';
import useSWR from 'swr';

import {getArchiveGoalListKey} from '@/core/SWRKeys';
import {IGoal} from '@/model';
import {AuthContext} from '@/modules/Auth/context';

export const useArchiveGoals = () => {
    const {userId} = useContext(AuthContext);
    const {data, isLoading} = useSWR<IGoal[]>(getArchiveGoalListKey(userId));

    return {
        archiveGoalList: data ?? [],
        isLoading,
    };
};
