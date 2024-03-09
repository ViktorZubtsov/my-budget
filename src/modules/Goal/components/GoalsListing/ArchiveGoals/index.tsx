import {Spinner} from '@salutejs/plasma-web';
import {useRouter} from 'next/navigation';
import {useSession} from 'next-auth/react';
import {useCallback, useEffect, useState} from 'react';

import {EmptyList} from '@/components/EmptyList';
import {useFetch} from '@/hooks';
import {IGoal} from '@/model';
import {GoalElement} from '@/modules/Goal/components/GoalItem/GoalElement';
import {ArchiveGoalsStyled, Wrap} from '@/modules/Goal/components/GoalsListing/ArchiveGoals/styled';

export const ArchiveGoals = () => {
    const {data} = useSession();
    const {isFetching, setIsFetching} = useFetch();
    const {push} = useRouter();

    const [list, setList] = useState<IGoal[]>([]);
    const loadList = useCallback(() => {
        setIsFetching(true);
        setIsFetching(false);
    }, [setIsFetching]);

    useEffect(() => loadList(), [loadList]);

    return (
        <ArchiveGoalsStyled>
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
                <Wrap>
                    {list.length ? (
                        list.map((goal) => (
                            <div onClick={() => push(`/archive/${goal.id}`)}>
                                <GoalElement key={goal.id} name={goal.name} description={goal.description} />
                            </div>
                        ))
                    ) : (
                        <EmptyList text="Архив пуст" />
                    )}
                </Wrap>
            )}
        </ArchiveGoalsStyled>
    );
};
