import React from 'react';
import {SwipeAction, TrailingActions} from 'react-swipeable-list';

import Delete from '../Delete';
import Edit from '../Edit';

interface IActionsEditDeleteProps {
    handleRemove: () => void;
    handleEdit: () => void;
}
export const trailingActionsEditDelete = ({handleRemove, handleEdit}: IActionsEditDeleteProps) => (
    <TrailingActions>
        <SwipeAction onClick={handleEdit}>
            <Edit />
        </SwipeAction>
        <SwipeAction destructive={true} onClick={handleRemove}>
            <Delete />
        </SwipeAction>
    </TrailingActions>
);
