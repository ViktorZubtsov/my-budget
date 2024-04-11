'use client';
import {withSkeleton, WithSkeletonProps} from '@salutejs/plasma-web';
import {memo, useContext} from 'react';

import {EmptyList} from '@/components/EmptyList';
import {AuthContext} from '@/modules/Auth/context';
import {useAccount} from '@/modules/Settings/hooks/useAccount';
import {TaskElement} from '@/modules/Task/components/TaskElement';
import {TaskElementStyled} from '@/modules/Task/components/TaskElement/styled';
import {TaskSum} from '@/modules/Task/components/TaskSum';
import {useTaskArchiveList} from '@/modules/Task/hooks/useTaskArchiveList';
import {ArchiveTaskContent, ArchiveTaskListingStyled} from '@/modules/Task/sectoin/ArchiveTaskListing/styled';

const TaskElementSkeleton = withSkeleton<WithSkeletonProps>(TaskElementStyled);

export const ArchiveTaskListing = memo(() => {
    const {session} = useContext(AuthContext);
    const {accountsList} = useAccount();
    const {taskArchiveList, sum} = useTaskArchiveList();
    const isLoader = 'loading' === session;

    return (
        <ArchiveTaskListingStyled>
            <TaskSum skeleton={isLoader} sum={sum} />
            <ArchiveTaskContent>
                {!taskArchiveList.length && !isLoader && <EmptyList text="Список задач пуст" />}
                {isLoader && [1, 2, 3].map((value) => <TaskElementSkeleton style={{height: '100px'}} skeleton key={value} />)}
                {Boolean(taskArchiveList.length) &&
                    !isLoader &&
                    taskArchiveList.map((task) => <TaskElement accountsList={accountsList} key={task.id} task={task} />)}
            </ArchiveTaskContent>
        </ArchiveTaskListingStyled>
    );
});
