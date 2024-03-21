import {memo, useState} from 'react';

import {AddButton} from '@/components/AddButton';
import {EmptyList} from '@/components/EmptyList';
import {TTask} from '@/model';
import {useAccount} from '@/modules/Settings/hooks/useAccount';
import {AddTask} from '@/modules/Task/components/AddTask';
import {EditTask} from '@/modules/Task/components/EditTask';
import {TaskItem} from '@/modules/Task/components/TaskItem';
import {TaskSum} from '@/modules/Task/components/TaskSum';
import {useTask} from '@/modules/Task/hooks/useTask';
import {GoalXListStyled} from '@/modules/Task/sectoin/TaskListing/styled';
import {useLoaderStore} from '@/store/loaderStore';

export const TaskListing = memo(() => {
    const {taskList, sum, checkTask, removeTask} = useTask();
    const {accountsList} = useAccount();

    const {isProcessLoader} = useLoaderStore();
    const [isShowAddTask, setIsShowAddTask] = useState<boolean>(false);
    const [isShowEditTask, setIsShowEditTask] = useState<boolean>(false);
    const [taskId, setTaskId] = useState<TTask['id']>('');

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
                            onRemove={removeTask}
                            onAccept={checkTask}
                            key={task.id}
                            task={task}
                        />
                    ))}
            </GoalXListStyled>
            <AddButton isFixed onClick={() => setIsShowAddTask(true)} />
            <EditTask taskId={taskId} isOpen={isShowEditTask} onClose={() => setIsShowEditTask(false)} />
            <AddTask onClose={() => setIsShowAddTask(false)} isOpen={isShowAddTask} />
        </>
    );
});
