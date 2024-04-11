import {withSkeleton, WithSkeletonProps} from '@salutejs/plasma-web';
import {memo, useContext, useState} from 'react';

import {AddButton} from '@/components/AddButton';
import {EmptyList} from '@/components/EmptyList';
import {TEST_ID_TASK} from '@/constant/dataTest';
import {TTask} from '@/model';
import {AuthContext} from '@/modules/Auth/context';
import {useAccount} from '@/modules/Settings/hooks/useAccount';
import {AddTask} from '@/modules/Task/components/AddTask';
import {EditTask} from '@/modules/Task/components/EditTask';
import {TaskElementStyled} from '@/modules/Task/components/TaskElement/styled';
import {TaskItem} from '@/modules/Task/components/TaskItem';
import {TaskSum} from '@/modules/Task/components/TaskSum';
import {useTask} from '@/modules/Task/hooks/useTask';
import {GoalXListStyled} from '@/modules/Task/sectoin/TaskListing/styled';
import {useLoaderStore} from '@/store/loaderStore';

const TaskElementSkeleton = withSkeleton<WithSkeletonProps>(TaskElementStyled);

export const TaskListing = memo(() => {
    const {session} = useContext(AuthContext);
    const {taskList, sum, checkTask, removeTask} = useTask();
    const {accountsList} = useAccount();
    const {isProcessLoader} = useLoaderStore();
    const [isShowAddTask, setIsShowAddTask] = useState<boolean>(false);
    const [isShowEditTask, setIsShowEditTask] = useState<boolean>(false);
    const [taskId, setTaskId] = useState<TTask['id']>('');
    const isLoader = 'loading' === session;

    return (
        <>
            <TaskSum skeleton={isLoader} sum={sum} />
            <GoalXListStyled data-testid={TEST_ID_TASK.LIST}>
                {!taskList.length && !isLoader && <EmptyList text="Список задач пуст" />}
                {isLoader && [1, 2, 3].map((value) => <TaskElementSkeleton style={{height: '100px'}} skeleton key={value} />)}
                {Boolean(taskList.length) &&
                    !isLoader &&
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
