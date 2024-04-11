'use client';

import {SpacingProps} from '@salutejs/plasma-ui';
import {withSkeleton, WithSkeletonProps} from '@salutejs/plasma-web';
import {useRouter} from 'next/navigation';
import React, {memo} from 'react';
import {SwipeableList, SwipeableListItem, Type as ListType} from 'react-swipeable-list';

import {trailingActionDelete} from '@/components/TrailingActions/ActionsDelete';
import {IGoal} from '@/model';
import {GoalElement} from '@/modules/Goal/components/GoalItem/GoalElement';
import {GoalItemWrap} from '@/modules/Goal/components/GoalItem/styled';

export interface IGoalItemProps {
    goal: IGoal;
    skeleton?: boolean;
    isBlock?: boolean;
    onRemove?: ({id}: {id: IGoal['id']}) => void;
}

const GoalItemWrapSkeleton = withSkeleton<SpacingProps & WithSkeletonProps>(GoalItemWrap);

export const GoalItem = memo<IGoalItemProps>(function GoalItem({goal, skeleton, onRemove, isBlock}) {
    const {push} = useRouter();
    const {name, description, id} = goal;

    const goToGoal = () => {
        return push('/goal/' + id);
    };

    return (
        <GoalItemWrapSkeleton style={{borderRadius: '15px'}} skeleton={skeleton} mb="4x">
            {onRemove && (
                <SwipeableList fullSwipe={true} type={ListType.IOS}>
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
            {!onRemove && <GoalElement skeleton={skeleton} name={name} description={description} />}
        </GoalItemWrapSkeleton>
    );
});
