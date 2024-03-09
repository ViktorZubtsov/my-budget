import {useRouter} from 'next/router';
import React, {memo} from 'react';
import {SwipeableList, SwipeableListItem} from 'react-swipeable-list';

import {trailingActionDelete} from '@/components/TrailingActions/ActionsDelete';
import {IGoal} from '@/model';
import {GoalElement} from '@/modules/Goal/components/GoalItem/GoalElement';
import {GoalItemWrap} from '@/modules/Goal/components/GoalItem/styled';

export interface IGoalItemProps {
    goal: IGoal;
    isBlock?: boolean;
    onRemove?: (id: {id: IGoal['id']}) => void;
}

export const GoalItem = memo<IGoalItemProps>(function GoalItem({goal, onRemove, isBlock}) {
    const {push} = useRouter();
    const {name, description, id} = goal;

    const goToGoal = () => {
        return push('/goal/' + id);
    };

    return (
        <GoalItemWrap mb="4x">
            {onRemove && (
                <SwipeableList>
                    <SwipeableListItem
                        blockSwipe={isBlock}
                        maxSwipe={1}
                        onClick={goToGoal}
                        trailingActions={trailingActionDelete({handleRemove: () => onRemove({id})})}
                    >
                        <GoalElement name={name} description={description} />
                    </SwipeableListItem>
                </SwipeableList>
            )}
            {!onRemove && <GoalElement name={name} description={description} />}
        </GoalItemWrap>
    );
});
