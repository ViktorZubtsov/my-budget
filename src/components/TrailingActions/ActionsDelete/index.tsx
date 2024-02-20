import React from 'react';
import {SwipeAction, TrailingActions} from 'react-swipeable-list';

import Delete from '../Delete';

export const trailingActionDelete = ({handleRemove}: {handleRemove: () => void}) => (
    <TrailingActions>
        <SwipeAction destructive={true} onClick={handleRemove}>
            <Delete />
        </SwipeAction>
    </TrailingActions>
);
