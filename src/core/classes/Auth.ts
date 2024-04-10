import {getServerSession} from 'next-auth';

import {authConfig} from '@/core/auth';

class Auth {
    getSession() {
        return getServerSession(authConfig);
    }
}

export const $Auth = new Auth();
