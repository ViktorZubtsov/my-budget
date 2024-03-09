import useSWR from 'swr';

import {getGoalListKey} from '@/core/SWRKeys';
import {IGoal} from '@/model';

export const useGoal = () => {
    const userId = 'clpdnwkhm0000dgnrlljhvj2e';
    const {data} = useSWR<{goalList: IGoal[]}>(getGoalListKey(userId), {revalidateOnMount: false});
    const addGoal = () => {
        return new Promise(() => {});
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
        goalsList: data?.goalList ?? [],
    };
};
