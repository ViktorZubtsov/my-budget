import useSWR from 'swr';

import {getTaskArchiveListKey, getTaskListKey} from '@/core/SWRKeys';
import {IGoal, TTask} from '@/model';

export const useTaskArchiveList = (goalId: IGoal['id']) => {
    const {data} = useSWR<TTask[]>(getTaskArchiveListKey(goalId), {revalidateOnMount: false});

    return {
        taskArchiveList: data ?? [],
    };
};
