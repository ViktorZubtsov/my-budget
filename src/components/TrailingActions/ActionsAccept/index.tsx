import {LeadingActions, SwipeAction} from 'react-swipeable-list';

import Accept from '../Accept';
export const leadingActionsAccept = ({handleAccept}: {handleAccept: () => void}) => (
    <LeadingActions>
        <SwipeAction onClick={handleAccept}>
            <Accept />
        </SwipeAction>
    </LeadingActions>
);
