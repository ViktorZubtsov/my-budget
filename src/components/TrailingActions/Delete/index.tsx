import {IconTrashFilled} from '@salutejs/plasma-icons';
import React from 'react';

import {TEST_ID_COMMON} from '@/constant/dataTest';

import {DeleteStyled} from './styled';

const Delete = ({onClick}: {onClick: () => void}) => {
    return (
        <DeleteStyled data-testid={TEST_ID_COMMON.REMOVE_BUTTON} onClick={onClick}>
            <IconTrashFilled size="s" color="inherit" />
        </DeleteStyled>
    );
};
export default Delete;
