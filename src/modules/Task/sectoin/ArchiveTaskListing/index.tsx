'use client';
import {memo, useMemo} from 'react';

import {EmptyList} from '@/components/EmptyList';
import {IAccount, TTask} from '@/model';
import {TaskElement} from '@/modules/Task/components/TaskElement';
import {TaskSum} from '@/modules/Task/components/TaskSum';
import {ArchiveTaskContent, ArchiveTaskListingStyled} from '@/modules/Task/sectoin/ArchiveTaskListing/styled';

export const ArchiveTaskListing = memo(({taskList, accountsList}: {taskList: TTask[]; accountsList: IAccount[]}) => {
    const sum = useMemo<number | undefined>(() => {
        return taskList?.reduce((previousValue, currentValue) => Number(previousValue) + Number(currentValue.price), 0);
    }, [taskList]);

    return (
        <ArchiveTaskListingStyled>
            {Boolean(sum) && <TaskSum sum={sum} />}

            <ArchiveTaskContent>
                {!taskList.length && <EmptyList text="Список задач пуст" />}
                {Boolean(taskList.length) && taskList.map((task) => <TaskElement accountsList={accountsList} key={task.id} task={task} />)}
            </ArchiveTaskContent>
        </ArchiveTaskListingStyled>
    );
});
