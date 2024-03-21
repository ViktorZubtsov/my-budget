import {useState} from 'react';
import {useContext} from 'react';
import {toast} from 'react-toastify';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

import {getTaskListKey} from '@/core/SWRKeys';
import {mobileVibrate, onError} from '@/helpers';
import {IGoalShort, TTask} from '@/model';
import {GoalContext} from '@/modules/Goal/context';
import {checkedTaskQuery} from '@/modules/Task/actions/checkedTask';

export const useTask = () => {
    const {id: goalId} = useContext(GoalContext);
    const [isShow, setIsShow] = useState('');
    const {data} = useSWR<TTask[]>(getTaskListKey(goalId), {revalidateOnMount: false});

    const {trigger: checkTaskTrigger, isMutating} = useSWRMutation(getTaskListKey(goalId), checkedTaskQuery, {
        onError,
        onSuccess: () => {
            mobileVibrate();
            toast.success('Задача отмечена', {theme: 'dark'});
        },
    });

    //
    // const createTask = async (goalId: IGoal['id'], {bankAccount, price, name}: TUseTaskParams) => {
    //     return new Promise((resolve, reject) => {
    //         addTask({goalId, task: {bankAccount, name, price}})
    //             .then((res) => {
    //                 toast.success('Задача успешно создана', {theme: 'dark'});
    //                 resolve(res);
    //             })
    //             .catch((err) => {
    //                 toast.error(`${err}`, {theme: 'dark'});
    //                 reject(errorHandler(err));
    //             });
    //     });
    // };
    // const editTask = async (taskId: TTask['id'], {bankAccount, price, name}: TUseTaskParams) => {
    //     return new Promise((resolve, reject) => {
    //         updateTask({task: {bankAccount, name, price}, taskId})
    //             .then((res) => {
    //                 toast.success('Задача изменина', {theme: 'dark'});
    //                 return resolve(res);
    //             })
    //             .catch((err) => {
    //                 toast.error(`${err}`, {theme: 'dark'});
    //                 reject(errorHandler(err));
    //             });
    //     });
    // };
    // const removeTask = async (taskId: TTask['id']) => {
    //     return new Promise((resolve, reject) => {
    //         deleteTask({
    //             taskId,
    //         })
    //             .then((res) => {
    //                 toast.success('Задача удалена', {theme: 'dark'});
    //                 return resolve(res);
    //             })
    //             .catch((err) => {
    //                 toast.error(`${err}`, {theme: 'dark'});
    //                 reject(errorHandler(err));
    //             });
    //     });
    // };
    const checkTask = async (taskId: TTask['id']) => {
        const {done} = data?.find(({id}) => id === taskId) ?? {done: false};

        return checkTaskTrigger({isDone: !done, taskId});
    };

    return {
        checkTask,
        isShow,
        setIsShow,
        taskList: data ?? [],
    };
};
