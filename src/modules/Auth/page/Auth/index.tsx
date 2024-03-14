'use client';
import {AuthBlock} from '@/modules/Auth/components/AuthBlock';

import {AuthPageContainer} from './styled';

export const AuthPage = () => {
    return (
        <AuthPageContainer>
            <AuthBlock />
        </AuthPageContainer>
    );
};
