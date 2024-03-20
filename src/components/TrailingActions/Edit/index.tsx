import {IconEdit} from '@salutejs/plasma-icons';
import React from 'react';

import {TEST_ID_COMMON} from '@/constant/dataTest';

import {EditStyled} from './styled';

const Edit = () => {
    return (
        <EditStyled data-testid={TEST_ID_COMMON.EDIT_BUTTON}>
            <IconEdit size="s" color="inherit" />
        </EditStyled>
    );
};
export default Edit;
