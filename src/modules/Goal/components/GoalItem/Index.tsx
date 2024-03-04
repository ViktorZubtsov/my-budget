import {CellDisclosure, h5, TextBox, TextBoxSubTitle, TextBoxTitle} from '@salutejs/plasma-ui';
import {useRouter} from 'next/router';
import React, {memo} from 'react';
import {SwipeableList, SwipeableListItem} from 'react-swipeable-list';

import {trailingActionDelete} from '@/components/TrailingActions/ActionsDelete';
import {IGoal} from '@/model';

import style from './styles.module.scss';

export interface IGoalItemProps {
    goal: IGoal;
    isBlock?: boolean;
    onRemove?: (id: {id: IGoal['id']}) => void;
}

export const GoalElement = ({name, description, onClick}: {name: IGoal['name']; description: IGoal['description']; onClick: () => void}) => {
    return (
        <div className={style.GoalItem}>
            <TextBox>
                <TextBoxTitle style={h5}>{name}</TextBoxTitle>
                <TextBoxSubTitle>{description}</TextBoxSubTitle>
            </TextBox>
            <CellDisclosure size="s" onClick={onClick} tabIndex={-1} />
        </div>
    );
};
export const GoalItem = memo<IGoalItemProps>(function GoalItem({goal, onRemove, isBlock}) {
    const {push} = useRouter();
    const {name, description, id} = goal;
    const goToGoal = () => {
        return push('/goal/' + id);
    };
    return (
        <div className={style.GoalItemWrap}>
            {onRemove && (
                <SwipeableList>
                    <SwipeableListItem blockSwipe={isBlock} maxSwipe={1} trailingActions={trailingActionDelete({handleRemove: () => onRemove({id})})}>
                        <GoalElement onClick={goToGoal} name={name} description={description} />
                    </SwipeableListItem>
                </SwipeableList>
            )}
            {!onRemove && <GoalElement onClick={() => {}} name={name} description={description} />}
        </div>
    );
});
