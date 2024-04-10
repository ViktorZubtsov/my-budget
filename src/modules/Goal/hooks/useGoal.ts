import {useContext} from 'react';
import {toast} from 'react-toastify';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import {v4} from 'uuid';

import {getGoalListKey, getTaskListKey} from '@/core/SWRKeys';
import {onError} from '@/helpers';
import {IGoal, TTask} from '@/model';
import {AuthContext} from '@/modules/Auth/context';
import {createGoalQuery} from '@/modules/Goal/actions/addGoalToUser';
import {removeGoalQuery} from '@/modules/Goal/actions/removeGoalById';
import {getTaskListQuery} from '@/modules/Task/actions/getAllTasksForGoal';
import {useLoaderStore} from '@/store/loaderStore';

export const useGoal = () => {
    const {userId} = useContext(AuthContext);

    const {data} = useSWR<IGoal[]>(getGoalListKey(userId), {revalidateOnMount: true});

    const {trigger} = useSWRMutation(getGoalListKey(userId), removeGoalQuery, {
        onError,
        onSuccess: () => toast.success('Цель удалена', {theme: 'dark'}),
    });

    const {trigger: createGoal, isMutating: isGoalLoader} = useSWRMutation(getGoalListKey(userId), createGoalQuery, {
        onError,
        onSuccess: () => toast.success('Цель успешно создана', {theme: 'dark'}),
    });

    const addGoal = ({description, name}: {description: string; name: string}) => {
        return createGoal({
            goal: {
                description,
                id: v4(),
                name,
            },
        });
    };

    const removeGoal = async ({id}: {id: IGoal['id']}) => {
        const goal = data?.find((item) => item.id === id);

        if (goal) {
            useLoaderStore.setState({isProcessLoader: true});

            // TODO: переделать запрос списка задачь
            getTaskListQuery(getTaskListKey(goal.id) ?? '')
                .then((res) => {
                    return res.json();
                })
                .then((res) => {
                    const taskList = res.data;

                    trigger({goal: {...goal, tasks: taskList ?? ([] as TTask[])}, goalId: id}).finally(() => {
                        useLoaderStore.setState({isProcessLoader: false});
                    });
                });
        }
    };

    return {
        addGoal,
        goalsList: data ?? [],
        isGoalLoader,
        removeGoal,
    };
};
