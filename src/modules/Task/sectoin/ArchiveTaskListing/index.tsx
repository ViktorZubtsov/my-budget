'use client';
import {memo} from 'react';

import {EmptyList} from '@/components/EmptyList';
import {useAccount} from '@/modules/Settings/hooks/useAccount';
import {TaskElement} from '@/modules/Task/components/TaskElement';
import {TaskSum} from '@/modules/Task/components/TaskSum';
import {useTaskArchiveList} from '@/modules/Task/hooks/useTaskArchiveList';
import {ArchiveTaskContent, ArchiveTaskListingStyled} from '@/modules/Task/sectoin/ArchiveTaskListing/styled';

export const ArchiveTaskListing = memo(() => {
    const {accountsList} = useAccount();
    const {taskArchiveList, sum} = useTaskArchiveList();

    return (
        <ArchiveTaskListingStyled>
            {Boolean(sum) && <TaskSum sum={sum} />}

            <ArchiveTaskContent>
                {!taskArchiveList.length && <EmptyList text="Список задач пуст" />}
                {Boolean(taskArchiveList.length) &&
                    taskArchiveList.map((task) => <TaskElement accountsList={accountsList} key={task.id} task={task} />)}
            </ArchiveTaskContent>
        </ArchiveTaskListingStyled>
    );
});
