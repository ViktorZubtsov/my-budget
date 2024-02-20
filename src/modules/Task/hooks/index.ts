import {useState} from 'react';
import {toast} from 'react-toastify';

import errorHandler from '../../../core/exceptions/ErrorHandler';
import {mobileVibrate} from '../../../helpers';
import {IGoal, TTask} from '../../../model';
import {addTask} from '../actions/addTask';
import {checkedTask} from '../actions/checkedTask';
import {deleteTask} from '../actions/deleteTask';
import {updateTask} from '../actions/updateTask';

type TUseTaskParams = {
    bankAccount: TTask['bankAccount'];
    name: TTask['name'];
    price: TTask['price'];
};
export const useTask = ({taskList}: {taskList: TTask[]}) => {
    const [isShow, setIsShow] = useState('');

    const createTask = async (goalId: IGoal['id'], {bankAccount, price, name}: TUseTaskParams) => {
        return new Promise((resolve, reject) => {
            addTask({goalId, task: {bankAccount, name, price}})
                .then((res) => {
                    toast.success('Задача успешно создана', {theme: 'dark'});
                    resolve(res);
                })
                .catch((err) => {
                    toast.error(`${err}`, {theme: 'dark'});
                    reject(errorHandler(err));
                });
        });
    };
    const editTask = async (taskId: TTask['id'], {bankAccount, price, name}: TUseTaskParams) => {
        return new Promise((resolve, reject) => {
            updateTask({task: {bankAccount, name, price}, taskId})
                .then((res) => {
                    toast.success('Задача изменина', {theme: 'dark'});
                    return resolve(res);
                })
                .catch((err) => {
                    toast.error(`${err}`, {theme: 'dark'});
                    reject(errorHandler(err));
                });
        });
    };
    const removeTask = async (taskId: TTask['id']) => {
        return new Promise((resolve, reject) => {
            deleteTask({
                taskId,
            })
                .then((res) => {
                    toast.success('Задача удалена', {theme: 'dark'});
                    return resolve(res);
                })
                .catch((err) => {
                    toast.error(`${err}`, {theme: 'dark'});
                    reject(errorHandler(err));
                });
        });
    };
    const checkTask = async (taskId: TTask['id']) => {
        const currentTask = taskList.find(({id}) => id === taskId);
        return new Promise((resolve, reject) => {
            checkedTask({task: {done: Boolean(!currentTask?.done)}, taskId})
                .then((res) => {
                    mobileVibrate();
                    toast.success('Задача отмечена', {theme: 'dark'});
                    return resolve(res);
                })
                .catch((err) => {
                    toast.error(`${err}`, {theme: 'dark'});
                    reject(errorHandler(err));
                });
        });
    };

    return {
        checkTask,
        createTask,
        editTask,
        isShow,
        removeTask,
        setIsShow,
    };
};
