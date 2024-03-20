import {useContext} from 'react';
import {toast} from 'react-toastify';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import {v4} from 'uuid';

import {getGoalListKey} from '@/core/SWRKeys';
import {onError} from '@/helpers';
import {IGoal, TTask} from '@/model';
import {AuthContext} from '@/modules/Auth/context';
import {createGoalQuery} from '@/modules/Goal/actions/addGoalToUser';
import {removeGoalQuery} from '@/modules/Goal/actions/removeGoalById';
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

    const removeGoal = ({id}: {id: IGoal['id']}) => {
        const goal = data?.find((item) => item.id === id);

        if (goal) {
            useLoaderStore.setState({isProcessLoader: true});
            // TODO: Add task by goal Id
            trigger({goal: {...goal, tasks: [] as TTask[]}, goalId: id}).finally(() => {
                useLoaderStore.setState({isProcessLoader: false});
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
