import {useContext, useMemo} from 'react';
import useSWR from 'swr';

import {getTaskArchiveListKey} from '@/core/SWRKeys';
import {TTask} from '@/model';
import {GoalContext} from '@/modules/Goal/context';

export const useTaskArchiveList = () => {
    const {id: goalId} = useContext(GoalContext);
    const {data} = useSWR<TTask[]>(getTaskArchiveListKey(goalId), {revalidateOnMount: false});
    const taskArchiveList = data ?? [];

    const sum = useMemo<number | undefined>(() => {
        return taskArchiveList?.reduce((previousValue, currentValue) => Number(previousValue) + Number(currentValue.price), 0);
    }, [taskArchiveList]);

    return {
        taskArchiveList,
        sum,
    };
};
