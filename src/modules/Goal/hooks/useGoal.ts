import {toast} from 'react-toastify';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

import errorHandler from '@/core/exceptions/ErrorHandler';
import {getGoalListKey} from '@/core/SWRKeys';
import {IGoal, TTask} from '@/model';
import {removeGoalQuery} from '@/modules/Goal/actions/removeGoalById';
import {useLoaderStore} from '@/store/loaderStore';

export const useGoal = () => {
    const userId = 'clpdnwkhm0000dgnrlljhvj2e';
    const {data} = useSWR<IGoal[]>(getGoalListKey(userId), {revalidateOnMount: false});

    const {trigger} = useSWRMutation(getGoalListKey(userId), removeGoalQuery, {
        onError: (err) => {
            toast.error('Что-то пошло не так', {theme: 'dark'});
            errorHandler(err);
        },
        onSuccess: () => toast.success('Цель удалена', {theme: 'dark'}),
    });

    const addGoal = () => {
        return new Promise(() => {});
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

    //     const addGoal = (uid: TUid, {name, description}: {name: IGoal['name']; description: IGoal['description']}) => {
    //         const baseObj = {
    //             description,
    //             id: v4(),
    //             name,
    //         } as IGoal;
    // import {getGoalListKey} from '@/core/SWRKeys';
    // import {IGoal} from '@/model';
    // export const useGoal = () => {
    //     const userId = 'clpdnwkhm0000dgnrlljhvj2e';
    //     const {data} = useSWR<{goalList: IGoal[]}>(getGoalListKey(userId), {revalidateOnMount: false});
    //
    //         return new Promise((resolve, reject) => {
    //             addGoalToUser({goal: baseObj, uid})
    //                 .then(() => {
    //                     toast.success('Цель успешно создана', {theme: 'dark'});
    //                     resolve(true);
    //                 })
    //                 .catch((err) => {
    //                     toast.error('Ошибка, попробуйте позже', {theme: 'dark'});
    //                     reject(errorHandler(err));
    //                 });
    //         });
    //     return {
    //         goalsList: data?.goalList ?? [],
    //     };
    return {
        addGoal,
        goalsList: data ?? [],
        removeGoal,
    };
};
