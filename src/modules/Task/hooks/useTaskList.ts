import useSWR from 'swr';

import {getTaskListKey} from '@/core/SWRKeys';
import {IGoal, TTask} from '@/model';

export const useTaskList = (goalId: IGoal['id']) => {
    const {data} = useSWR<TTask[]>(getTaskListKey(goalId), {revalidateOnMount: false});

    return {
        taskList: data ?? [],
    };
};
