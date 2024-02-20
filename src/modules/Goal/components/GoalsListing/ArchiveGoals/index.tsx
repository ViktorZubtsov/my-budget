'use client';
import {Button} from '@salutejs/plasma-ui';
import {ButtonProps, Spinner, withSkeleton, WithSkeletonProps} from '@salutejs/plasma-web';
import {useRouter} from 'next/navigation';
import {useSession} from 'next-auth/react';
import {useCallback, useEffect, useState} from 'react';

import {EmptyList} from '../../../../../components/EmptyList';
import {useFetch} from '../../../../../hooks';
import {IGoal} from '../../../../../model';
import {getGoalsArchiveListByUid} from '../../../actions/getGoalsArchiveListByUid';
import {GoalElement, GoalItem} from '../../GoalItem/Index';

import style from './styles.module.scss';

export const ArchiveGoals = () => {
    const {data} = useSession();
    const {isFetching, setIsFetching} = useFetch();
    const {push} = useRouter();

    const [list, setList] = useState<IGoal[]>([]);
    const loadList = useCallback(() => {
        setIsFetching(true);
        getGoalsArchiveListByUid(data?.user.id).then((res) => {
            setList(res);
            setIsFetching(false);
        });
    }, [data, setIsFetching]);

    useEffect(() => loadList(), [loadList]);

    return (
        <div className={style.ArchiveGoals}>
            {isFetching && (
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        width: '100%',
                    }}
                >
                    <Spinner style={{zIndex: 999}} size={64} />
                </div>
            )}

            {!isFetching && (
                <div className={style.wrap}>
                    {list.length ? (
                        list.map((goal) => (
                            <GoalElement key={goal.id} name={goal.name} description={goal.description} onClick={() => push(`/archive/${goal.id}`)} />
                        ))
                    ) : (
                        <EmptyList text="Архив пуст" />
                    )}
                </div>
            )}
        </div>
    );
};
