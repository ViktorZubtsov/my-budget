import useSWR from 'swr';

import {getArchiveGoalListKey} from '@/core/SWRKeys';
import {IGoal} from '@/model';

export const useArchiveGoals = () => {
    const userId = 'clpdnwkhm0000dgnrlljhvj2e';
    const {data, isLoading} = useSWR<{data: IGoal[]}>(getArchiveGoalListKey(userId));

    return {
        archiveGoalList: data?.data ?? [],
        isLoading,
    };
};
