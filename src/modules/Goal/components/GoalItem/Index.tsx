import {CellDisclosure, h5, TextBox, TextBoxSubTitle, TextBoxTitle} from '@salutejs/plasma-ui';
import {useRouter} from 'next/router';
import React, {memo} from 'react';
import {SwipeableList, SwipeableListItem} from 'react-swipeable-list';

import {trailingActionDelete} from '@/components/TrailingActions/ActionsDelete';
import {IGoal} from '@/model';
import {GoalItemStyled, GoalItemWrap} from '@/modules/Goal/components/GoalItem/styled';

export interface IGoalItemProps {
    goal: IGoal;
    isBlock?: boolean;
    onRemove?: (id: {id: IGoal['id']}) => void;
}

export const GoalElement = ({name, description, onClick}: {name: IGoal['name']; description: IGoal['description']; onClick: () => void}) => {
    return (
        <GoalItemStyled mb="4x" pl="5x" pr="5x">
            <TextBox>
                <TextBoxTitle style={h5}>{name}</TextBoxTitle>
                <TextBoxSubTitle>{description}</TextBoxSubTitle>
            </TextBox>
            <CellDisclosure size="s" onClick={onClick} tabIndex={-1} />
        </GoalItemStyled>
    );
};
export const GoalItem = memo<IGoalItemProps>(function GoalItem({goal, onRemove, isBlock}) {
    const {push} = useRouter();
    const {name, description, id} = goal;

    const goToGoal = () => {
        return push('/goal/' + id);
    };

    return (
        <GoalItemWrap>
            {onRemove && (
                <SwipeableList>
                    <SwipeableListItem blockSwipe={isBlock} maxSwipe={1} trailingActions={trailingActionDelete({handleRemove: () => onRemove({id})})}>
                        <GoalElement onClick={goToGoal} name={name} description={description} />
                    </SwipeableListItem>
                </SwipeableList>
            )}
            {!onRemove && <GoalElement onClick={() => {}} name={name} description={description} />}
        </GoalItemWrap>
    );
});
