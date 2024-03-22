'use client';

import {Container} from '@salutejs/plasma-ui';
import {H4} from '@salutejs/plasma-web';
import {useRouter} from 'next/navigation';

import {IGoal, IGoalShort} from '@/model';
import {GoalXHeaderContent, GoalXHeaderIcon, GoalXHeaderStyled, Subtitle} from '@/modules/Goal/components/GoalXHeader/styled';

export const GoalXHeader = ({goal}: {goal: IGoalShort}) => {
    const {back} = useRouter();
    const {name, description} = goal;

    return (
        <Container>
            <GoalXHeaderStyled>
                <div onClick={back}>
                    <GoalXHeaderIcon size="s" color="inherit" />
                </div>
                <GoalXHeaderContent>
                    <H4>{name}</H4>
                    <Subtitle>{description}</Subtitle>
                </GoalXHeaderContent>
            </GoalXHeaderStyled>
        </Container>
    );
};
