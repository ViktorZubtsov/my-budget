import {IconDone} from '@salutejs/plasma-icons';
import React from 'react';

import {TEST_ID_COMMON} from '@/constant/dataTest';

import {AcceptStyled} from './styled';

const Accept = () => {
    return (
        <AcceptStyled data-testid={TEST_ID_COMMON.ACCEPT_BUTTON}>
            <IconDone size="s" color="inherit" />
        </AcceptStyled>
    );
};
export default Accept;
