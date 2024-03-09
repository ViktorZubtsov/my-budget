import {Spinner} from '@salutejs/plasma-web';
import {useRouter} from 'next/navigation';
import {useCallback, useEffect, useState} from 'react';

import {EmptyList} from '@/components/EmptyList';
import {useFetch} from '@/hooks';
import {IGoal} from '@/model';
import {GoalElement} from '@/modules/Goal/components/GoalItem/GoalElement';
import {ArchiveGoalsStyled, FetchingWrap, Wrap} from '@/modules/Goal/components/GoalsListing/ArchiveGoals/styled';

export const ArchiveGoals = () => {
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
                <FetchingWrap>
                    <Spinner style={{zIndex: 999}} size={64} />
                </FetchingWrap>
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
