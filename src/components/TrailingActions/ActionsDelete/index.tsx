import React from 'react';
import {SwipeAction, TrailingActions} from 'react-swipeable-list';

import Delete from '@/components/TrailingActions/Delete';

export const trailingActionDelete = ({handleRemove}: {handleRemove: () => void}) => (
    <TrailingActions>
        <SwipeAction destructive={true} onClick={handleRemove}>
            <Delete onClick={handleRemove} />
        </SwipeAction>
    </TrailingActions>
);
