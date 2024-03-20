'use client';
import {Container, H5, Price} from '@salutejs/plasma-ui';
import {memo, useMemo} from 'react';

import {EmptyList} from '@/components/EmptyList';
import {IAccount, TTask} from '@/model';
import {TaskItemElement} from '@/modules/Goal/components/TaskItem/TaskItemElement';

import styles from './styles.module.scss';

export const ArchiveTaskListing = memo(({taskList, accountsList}: {taskList: TTask[]; accountsList: IAccount[]}) => {
    const sum = useMemo<number | undefined>(() => {
        return taskList?.reduce((previousValue, currentValue) => Number(previousValue) + Number(currentValue.price), 0);
    }, [taskList]);

    return (
        <Container className={styles.archiveTaskListing}>
            {Boolean(sum) && (
                <div className={styles.SumWrap}>
                    <H5>Сумма</H5>
                    <Price currency="rub" stroke={false} minimumFractionDigits={2}>
                        {sum ?? 0}
                    </Price>
                </div>
            )}

            <div className={styles.GoalXList}>
                {!taskList.length && <EmptyList text="Список задач пуст" />}
                {Boolean(taskList.length) &&
                    taskList.map((task) => (
                        <TaskItemElement className={styles.taskItemElement} accountsList={accountsList} key={task.id} task={task} />
                    ))}
            </div>
        </Container>
    );
});
