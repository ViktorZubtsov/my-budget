import {memo, useMemo, useState} from 'react';

import {TaskSum} from '@/modules/Task/components/TaskSum';
import {GoalXListStyled} from '@/modules/Task/sectoin/TaskListing/styled';

import {AddButton} from '../../../../components/AddButton';
import {EmptyList} from '../../../../components/EmptyList';
import {mobileVibrate} from '../../../../helpers';
import {IAccount, IGoalShort, TTask} from '../../../../model';
import {useLoaderStore} from '../../../../store/loaderStore';
import {AddTask} from '../../components/AddTask';
import {EditTask} from '../../components/EditTask';
import {TaskItem} from '../../components/TaskItem';
import {useTask} from '../../hooks';

export const TaskListing = memo(({taskList, accountsList, goal}: {taskList: TTask[]; accountsList: IAccount[]; goal: IGoalShort}) => {
    const {isProcessLoader} = useLoaderStore();
    const [isShowAddTask, setIsShowAddTask] = useState<boolean>(false);
    const [isShowEditTask, setIsShowEditTask] = useState<boolean>(false);
    const [taskId, setTaskId] = useState<TTask['id']>('');

    const selectedTask = useMemo(() => {
        const {bankAccount, name, price} = taskList?.find(({id}) => id === taskId) ?? {bankAccount: '', name: '', price: 0};

        return {bankAccount, name, price};
    }, [taskId, taskList]);

    const {removeTask, checkTask} = useTask({goalId: goal.id});
    const handleRemove = (id: TTask['id']) => {
        mobileVibrate();
        useLoaderStore.setState({isProcessLoader: true});
        removeTask(id).finally(() => {
            useLoaderStore.setState({isProcessLoader: false});
        });
    };

    const sum = useMemo<number | undefined>(() => {
        return taskList?.reduce((previousValue, currentValue) => Number(previousValue) + Number(currentValue.price), 0);
    }, [taskList]);

    return (
        <>
            {Boolean(sum) && <TaskSum sum={sum} />}

            <GoalXListStyled>
                {!taskList.length && <EmptyList text="Список задач пуст" />}
                {Boolean(taskList.length) &&
                    taskList.map((task) => (
                        <TaskItem
                            onEdit={(id) => {
                                setTaskId(id);
                                setIsShowEditTask(true);
                            }}
                            accountsList={accountsList}
                            isBlock={isProcessLoader}
                            onRemove={handleRemove}
                            onAccept={checkTask}
                            key={task.id}
                            task={task}
                        />
                    ))}
            </GoalXListStyled>
            <AddButton isFixed onClick={() => setIsShowAddTask(true)} />
            <EditTask
                accountsList={accountsList}
                taskList={taskList}
                taskId={taskId}
                isOpen={isShowEditTask}
                selectedTask={selectedTask}
                onClose={() => setIsShowEditTask(false)}
            />
            <AddTask accountsList={accountsList} taskList={taskList} onClose={() => setIsShowAddTask(false)} isOpen={isShowAddTask} />
        </>
    );
});
