import {useCallback, useContext, useMemo, useState} from 'react';
import {toast} from 'react-toastify';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

import {getTaskListKey} from '@/core/SWRKeys';
import {mobileVibrate, onError} from '@/helpers';
import {TTask} from '@/model';
import {GoalContext} from '@/modules/Goal/context';
import {addTaskQuery, ICreateTaskParams} from '@/modules/Task/actions/addTask';
import {checkedTaskQuery} from '@/modules/Task/actions/checkedTask';
import {removeTaskQuery} from '@/modules/Task/actions/deleteTask';
import {ITaskUpdateParams, updateTaskQuery} from '@/modules/Task/actions/updateTask';
import {useLoaderStore} from '@/store/loaderStore';

export const useTask = () => {
    const {id: goalId} = useContext(GoalContext);
    const taskKey = getTaskListKey(goalId);
    const [isShow, setIsShow] = useState('');
    const {data} = useSWR<TTask[]>(taskKey, {revalidateOnMount: false});
    const taskList = useMemo(() => data ?? [], [data]);
    const {trigger: checkTaskTrigger} = useSWRMutation(taskKey, checkedTaskQuery, {
        onError,
        onSuccess: () => {
            mobileVibrate();
            toast.success('Задача отмечена', {theme: 'dark'});
        },
    });

    const {trigger: removeTaskTrigger} = useSWRMutation(taskKey, removeTaskQuery, {
        onError,
        onSuccess: () => {
            mobileVibrate();
            useLoaderStore.setState({isProcessLoader: false});
            toast.success('Задача удалена', {theme: 'dark'});
        },
    });

    const {trigger: addTaskTrigger, isMutating: isCreateLoader} = useSWRMutation(taskKey, addTaskQuery, {
        onError,
        onSuccess: () => {
            mobileVibrate();
            toast.success('Задача успешно создана', {theme: 'dark'});
        },
    });

    const {trigger: updateTaskTrigger, isMutating: isUpdateLoader} = useSWRMutation(taskKey, updateTaskQuery, {
        onError,
        onSuccess: () => {
            mobileVibrate();
            toast.success('Задача изменина', {theme: 'dark'});
        },
    });

    const sum = useMemo<number | undefined>(() => {
        return taskList?.reduce((previousValue, currentValue) => Number(previousValue) + Number(currentValue.price), 0);
    }, [taskList]);

    const selectedTask = useCallback(
        (taskId: TTask['id']) => {
            const {bankAccount, name, price} = taskList?.find(({id}) => id === taskId) ?? {bankAccount: '', name: '', price: 0};

            return {bankAccount, name, price};
        },
        [taskList]
    );

    const createTask = async ({bankAccount, price, name}: ICreateTaskParams['task']) => {
        return addTaskTrigger({task: {bankAccount, name, price}});
    };

    const editTask = async ({taskId, task}: ITaskUpdateParams) => {
        return updateTaskTrigger({
            task,
            taskId,
        });
    };
    const checkTask = async (taskId: TTask['id']) => {
        const {done} = data?.find(({id}) => id === taskId) ?? {done: false};

        return checkTaskTrigger({isDone: !done, taskId});
    };

    const removeTask = async (taskId: TTask['id']) => {
        useLoaderStore.setState({isProcessLoader: true});
        return removeTaskTrigger({taskId}).finally(() => {
            useLoaderStore.setState({isProcessLoader: false});
        });
    };

    return {
        checkTask,
        createTask,
        editTask,
        isCreateLoader,
        isShow,
        isUpdateLoader,
        removeTask,
        selectedTask,
        setIsShow,
        sum,
        taskList,
    };
};
