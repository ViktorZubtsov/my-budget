import {Spinner} from '@salutejs/plasma-web';
import {useRouter} from 'next/navigation';

import {EmptyList} from '@/components/EmptyList';
import {GoalElement} from '@/modules/Goal/components/GoalItem/GoalElement';
import {ArchiveGoalsStyled, FetchingWrap, Wrap} from '@/modules/Goal/components/GoalsListing/ArchiveGoals/styled';
import {useArchiveGoals} from '@/modules/Goal/hooks/useArchiveGoals';

export const ArchiveGoals = () => {
    const {archiveGoalList, isLoading} = useArchiveGoals();
    const {push} = useRouter();

    return (
        <ArchiveGoalsStyled pb="16x">
            {isLoading && (
                <FetchingWrap>
                    <Spinner style={{zIndex: 999}} size={64} />
                </FetchingWrap>
            )}

            {!isLoading && (
                <Wrap>
                    {Boolean(archiveGoalList.length) ? (
                        archiveGoalList.map((goal) => (
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
