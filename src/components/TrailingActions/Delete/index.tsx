import {IconTrashFilled} from '@salutejs/plasma-icons';
import React from 'react';

import {DeleteStyled} from './styled';

const Delete = () => {
    return (
        <DeleteStyled>
            <IconTrashFilled size="s" color="inherit" />
        </DeleteStyled>
    );
};
export default Delete;
