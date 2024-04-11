'use client';

import {Container} from '@salutejs/plasma-ui';
import {H4} from '@salutejs/plasma-web';
import {withSkeleton, WithSkeletonProps} from '@salutejs/plasma-web';
import {useRouter} from 'next/navigation';
import {useContext} from 'react';

import {IGoalShort} from '@/model';
import {AuthContext} from '@/modules/Auth/context';
import {GoalXHeaderContent, GoalXHeaderIcon, GoalXHeaderStyled, Subtitle} from '@/modules/Goal/components/GoalXHeader/styled';

export const GoalXHeader = ({goal}: {goal: IGoalShort}) => {
    const {session} = useContext(AuthContext);
    const {back} = useRouter();
    const {name, description} = goal;
    const GoalXHeaderContentSkeleton = withSkeleton<WithSkeletonProps>(GoalXHeaderContent);

    return (
        <Container>
            <GoalXHeaderStyled>
                <div onClick={back}>
                    <GoalXHeaderIcon size="s" color="inherit" />
                </div>
                <GoalXHeaderContentSkeleton skeleton={'loading' === session}>
                    <H4>{name}</H4>
                    {description && <Subtitle>{description}</Subtitle>}
                </GoalXHeaderContentSkeleton>
            </GoalXHeaderStyled>
        </Container>
    );
};
